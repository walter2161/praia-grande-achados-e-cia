
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import CategoryCard from "@/components/CategoryCard";
import ListingGrid from "@/components/ListingGrid";
import MainLayout from "@/components/layout/MainLayout";
import { allListings, categories } from "@/data/mockData";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get the 8 most recent listings
  const recentListings = [...allListings]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-beach-600 to-beach-700 text-white py-16">
        <div className="container text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Compre, venda e encontre tudo em Praia Grande
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            O melhor guia local de produtos e serviços para todas as suas necessidades.
          </p>
          
          <div className="relative max-w-md mx-auto mt-8">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="O que você procura?" 
              className="pl-10 h-12 bg-white text-black"
            />
            <Button 
              className="absolute right-0 top-0 h-12 rounded-l-none"
              size="lg"
            >
              Buscar
            </Button>
          </div>
          
          <div className="mt-6">
            <Link to="/criar-anuncio">
              <Button size="lg" variant="secondary" className="font-semibold">
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
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
          
          <ListingGrid listings={recentListings} />
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
