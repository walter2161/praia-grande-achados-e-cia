import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import ListingGrid from "@/components/ListingGrid";
import { 
  categories, 
  autoListings, 
  jobListings, 
  realEstateListings, 
  serviceListings,
  baresRestaurantesListings, 
  itensListings 
} from "@/data/mockData";
import { Category, Listing } from "@/types";

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
  
  return (
    <MainLayout>
      <div className="container py-12">
        <div className="flex items-center gap-4 mb-8">
          <category.icon className="h-10 w-10 text-beach-600" />
          <h1 className="text-3xl font-bold">{category.name}</h1>
        </div>
        
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
