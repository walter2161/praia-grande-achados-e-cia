
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import ListingGrid from "@/components/ListingGrid";
import Map from "@/components/Map";
import {
  categories,
  autoListings,
  jobListings,
  realEstateListings,
  serviceListings,
  barRestaurantListings,
  itemListings,
} from "@/data/mockData";
import { Category, Listing, BarRestaurantListing, AutoListing, JobListing, RealEstateListing, ServiceListing, ItemListing } from "@/types";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [search] = useSearchParams();
  const category = categories.find((cat) => cat.slug === slug) as Category | undefined;

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
        // Forçar el tipo category específico em cada listagem
        return autoListings.map((l) => ({ ...l, category: "autos" } as AutoListing));
      case "empregos":
        return jobListings.map((l) => ({ ...l, category: "empregos" } as JobListing));
      case "imoveis":
        // Filter using query params for hierarchical filtering, if provided
        const tipo = search.get("tipo");
        const imovel = search.get("imovel");
        const estado = search.get("estado");
        let filtered = realEstateListings.map((l) => ({ ...l, category: "imoveis" } as RealEstateListing));
        if (tipo)
          filtered = filtered.filter((l) => l.negotiationType === tipo);
        if (imovel)
          filtered = filtered.filter((l) => l.propertyType === imovel);
        if (estado)
          filtered = filtered.filter((l) => l.usageType === estado);
        return filtered;
      case "servicos":
        return serviceListings.map((l) => ({ ...l, category: "servicos" } as ServiceListing));
      case "bares-restaurantes":
        return barRestaurantListings.map((l) => ({ ...l, category: "bares-restaurantes" } as BarRestaurantListing));
      case "itens":
        return itemListings.map((l) => ({ ...l, category: "itens" } as ItemListing));
      default:
        return [];
    }
  };

  const listings = getCategoryListings();

  // Only show map for bares e restaurantes
  let mapSection = null;
  if (
    category.slug === "bares-restaurantes" &&
    barRestaurantListings.length > 0
  ) {
    const pins = barRestaurantListings.map((b) => ({
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
          <p className="text-muted-foreground">
            Nenhum anúncio encontrado nesta categoria.
          </p>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoryPage;
