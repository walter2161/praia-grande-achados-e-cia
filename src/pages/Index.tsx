
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import CategoryCard from "@/components/CategoryCard";
import ListingGrid from "@/components/ListingGrid";
import MainLayout from "@/components/layout/MainLayout";
import { getRandomBannerImage } from "@/lib/bannerImages";
import { getCategories, getListings } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Category, Listing } from "@/types";
import * as LucideIcons from "lucide-react";
import { allListings } from "@/data/mockData";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const randomBanner = getRandomBannerImage();

  const { data: categoriesData = [], error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  const { data: listingsData = [], error: listingsError } = useQuery({
    queryKey: ['recentListings'],
    queryFn: getListings
  });

  // Function to convert string icon names to Lucide components
  const mapIconStringToComponent = (iconName: string) => {
    // Safe type assertion with a check
    const icons = LucideIcons as Record<string, unknown>;
    return (icons[iconName] as LucideIcons.LucideIcon) || LucideIcons.Package;
  };

  // Map categories data to include proper icon components
  const categories: Category[] = categoriesData.map((category: any) => ({
    ...category,
    icon: typeof category.icon === 'string' ? mapIconStringToComponent(category.icon) : LucideIcons.Package
  }));

  // Get the 8 most recent listings with proper type casting
  const listings: Listing[] = listingsData as unknown as Listing[];
  const recentListings = listings.slice(0, 8);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/todos-anuncios?busca=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/todos-anuncios");
    }
  };

  // Log errors to help with debugging
  if (categoriesError) {
    console.error("Error fetching categories:", categoriesError);
  }
  
  if (listingsError) {
    console.error("Error fetching listings:", listingsError);
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-b from-[#FF6600] to-[#FF6600]/80 text-white py-16 overflow-hidden"
        style={{
          minHeight: "420px",
        }}
      >
        {/* BG image */}
        <div
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
          style={{
            backgroundImage: `url(${randomBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />
        {/* Orange gradient overlay with 15% opacity */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: "linear-gradient(180deg, rgba(255,102,0,0.15) 0%, rgba(255,102,0,0.15) 80%)",
            zIndex: 1,
          }}
        />
        <div className="container relative z-10 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Compre, venda e encontre tudo em Praia Grande
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            O melhor guia local de produtos e serviços para todas as suas necessidades.
          </p>
          
          <form onSubmit={handleSearch} className="relative max-w-md mx-auto mt-8">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="O que você procura?" 
              className="pl-10 h-12 bg-white text-black"
            />
            <Button 
              type="submit"
              className="absolute right-0 top-0 h-12 rounded-l-none bg-[#FF6600] hover:bg-[#FF6600]/90"
              size="lg"
            >
              Buscar
            </Button>
          </form>
          
          <div className="mt-6">
            <Link to="/criar-anuncio">
              <Button size="lg" variant="secondary" className="font-semibold bg-white text-[#FF6600] hover:bg-gray-100">
                Anunciar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container space-y-8">
          <h2 className="text-3xl font-bold text-center">Navegue por Categorias</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category}
                showSubcategoriesButton={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Listings Section */}
      <section className="py-12">
        <div className="container space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">Anúncios Recentes</h2>
            <Link to="/todos-anuncios">
              <Button variant="outline">Ver Todos</Button>
            </Link>
          </div>
          
          {recentListings.length > 0 ? (
            <ListingGrid listings={recentListings} />
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-muted-foreground">Nenhum anúncio encontrado. Seja o primeiro a anunciar!</p>
              <Link to="/criar-anuncio" className="mt-4 inline-block">
                <Button className="mt-2">Criar Anúncio</Button>
              </Link>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-beach-50">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl font-bold">Tem algo para vender ou anunciar?</h2>
          <p className="text-xl max-w-2xl mx-auto text-muted-foreground">
            Anuncie gratuitamente e alcance milhares de pessoas em Praia Grande.
          </p>
          <Link to="/criar-anuncio">
            <Button size="lg" className="mt-4 bg-beach-600 hover:bg-beach-700">
              Criar Anúncio
            </Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
