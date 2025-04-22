
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import ListingGrid from "@/components/ListingGrid";
import Map from "@/components/Map";
import { 
  categories, 
  autoListings, 
  jobListings, 
  realEstateListings, 
  serviceListings,
  baresRestaurantesListings, 
  itensListings 
} from "@/data/mockData";
import { Category, Listing, BarRestaurantListing } from "@/types";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find(cat => cat.slug === slug) as Category;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (!category) {
    return (
      <MainLayout>
        <div className="container py-12">
          <h1 className="text-3xl font-bold mb-6">Categoria não encontrada</h1>
        </div>
      </MainLayout>
    );
  }

  const getCategoryListings = (): Listing[] => {
    switch (category.slug) {
      case "autos":
        return autoListings;
      case "empregos":
        return jobListings;
      case "imoveis":
        return realEstateListings;
      case "servicos":
        return serviceListings;
      case "bares-restaurantes":
        return baresRestaurantesListings;
      case "itens":
        return itensListings;
      default:
        return [];
    }
  };
  
  const listings = getCategoryListings();

  // Se bares-restaurantes, extrair pins para o mapa
  let mapSection = null;
  if (category.slug === "bares-restaurantes" && baresRestaurantesListings.length > 0) {
    const pins = baresRestaurantesListings.map((b: BarRestaurantListing) => ({
      latitude: b.latitude,
      longitude: b.longitude,
      title: b.title,
    }));
    mapSection = (
      <div className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-beach-700">Veja no mapa</h2>
        <Map pins={pins} height="350px" />
      </div>
    );
  }
  
  return (
    <MainLayout>
      <div className="container py-12">
        <div className="flex items-center gap-4 mb-8">
          <category.icon className="h-10 w-10 text-beach-600" />
          <h1 className="text-3xl font-bold">{category.name}</h1>
        </div>
        
        {mapSection}
        
        {listings.length > 0 ? (
          <ListingGrid listings={listings} />
        ) : (
          <p className="text-muted-foreground">Nenhum anúncio encontrado nesta categoria.</p>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoryPage;
