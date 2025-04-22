import { useEffect, useMemo, useState } from "react";
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
  baresRestaurantesListings,
  itensListings
} from "@/data/mockData";
import { Category, Listing, BarRestaurantListing, RealEstateListing } from "@/types";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const listingsMap: Record<string, { listings: Listing[]; subcategories: string[] }> = {
  autos: {
    listings: autoListings,
    subcategories: [...new Set(autoListings.map(item => item.subcategory))],
  },
  empregos: {
    listings: jobListings,
    subcategories: [...new Set(jobListings.map(item => item.subcategory))],
  },
  imoveis: {
    listings: realEstateListings,
    subcategories: [...new Set(realEstateListings.map(item => item.subcategory))],
  },
  servicos: {
    listings: serviceListings,
    subcategories: [...new Set(serviceListings.map(item => item.subcategory))],
  },
  "bares-restaurantes": {
    listings: baresRestaurantesListings,
    subcategories: [...new Set(baresRestaurantesListings.map(item => item.subcategory))],
  },
  itens: {
    listings: itensListings,
    subcategories: [...new Set(itensListings.map(item => item.subcategory))],
  },
};

const finalidadeOptions = [
  { value: "todas", label: "Todas" },
  { value: "Locação", label: "Locação" },
  { value: "Venda", label: "Venda" },
  { value: "Troca", label: "Troca" }
];

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSubcategory = searchParams.get("subcategoria") ?? "todas";
  const finalidadeFromParams = searchParams.get("finalidade") ?? "todas";
  const [finalidade, setFinalidade] = useState<string>(finalidadeFromParams);

  const category = categories.find(cat => cat.slug === slug) as Category;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    setFinalidade(finalidadeFromParams);
  }, [finalidadeFromParams, slug]);

  if (!category) {
    return (
      <MainLayout>
        <div className="container py-12">
          <h1 className="text-3xl font-bold mb-6">Categoria não encontrada</h1>
        </div>
      </MainLayout>
    );
  }

  const { listings, subcategories } = listingsMap[category.slug] || { listings: [], subcategories: [] };

  const handleChangeFiltro = (val: string) => {
    if (val === "todas") {
      searchParams.delete("subcategoria");
      setSearchParams(searchParams);
    } else {
      searchParams.set("subcategoria", val);
      setSearchParams(searchParams);
    }
  };

  const handleChangeFinalidade = (val: string) => {
    setFinalidade(val);
    if (val === "todas") {
      searchParams.delete("finalidade");
      setSearchParams(searchParams);
    } else {
      searchParams.set("finalidade", val);
      setSearchParams(searchParams);
    }
  };

  const filteredListings = useMemo(() => {
    let filtered = listings;
    if (selectedSubcategory !== "todas") {
      filtered = filtered.filter(listing => listing.subcategory === selectedSubcategory);
    }
    if (category.slug === "imoveis" && finalidade !== "todas") {
      filtered = filtered.filter(listing => {
        const realListing = listing as RealEstateListing;
        return (
          String(realListing.finalidade ?? "")
            .toLowerCase()
            .includes(finalidade.toLowerCase())
        );
      });
    }
    return filtered;
  }, [listings, selectedSubcategory, category.slug, finalidade]);

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

        {category.slug === "imoveis" && (
          <div className="mb-6 flex flex-wrap gap-4">
            <RadioGroup
              value={finalidade}
              onValueChange={handleChangeFinalidade}
              className="flex flex-wrap gap-4"
            >
              {finalidadeOptions.map(opt => (
                <div key={opt.value}>
                  <RadioGroupItem
                    value={opt.value}
                    id={`finalidade-${opt.value}`}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor={`finalidade-${opt.value}`}
                    className={`cursor-pointer px-4 py-1.5 rounded border border-muted-foreground transition
                      ${finalidade === opt.value ? "bg-[#F97316]/90 text-white border-[#F97316]" : "hover:bg-muted"}`}
                  >
                    {opt.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        <div className="mb-8">
          <RadioGroup
            value={selectedSubcategory}
            onValueChange={handleChangeFiltro}
            className="flex flex-wrap gap-4"
          >
            <div>
              <RadioGroupItem
                value="todas"
                id="subcat-todas"
                className="peer sr-only"
              />
              <label
                htmlFor="subcat-todas"
                className={`cursor-pointer px-4 py-1.5 rounded border border-muted-foreground transition 
                  ${selectedSubcategory === "todas" ? "bg-[#F97316]/90 text-white border-[#F97316]" : "hover:bg-muted"}`}
              >
                Todas
              </label>
            </div>
            {subcategories.map((sub) => (
              <div key={sub}>
                <RadioGroupItem
                  value={sub}
                  id={`subcat-${sub}`}
                  className="peer sr-only"
                />
                <label
                  htmlFor={`subcat-${sub}`}
                  className={`cursor-pointer px-4 py-1.5 rounded border border-muted-foreground transition
                    ${selectedSubcategory === sub ? "bg-[#F97316]/90 text-white border-[#F97316]" : "hover:bg-muted"}`}
                >
                  {sub}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {mapSection}

        {filteredListings.length > 0 ? (
          <ListingGrid listings={filteredListings} />
        ) : (
          <p className="text-muted-foreground">Nenhum anúncio encontrado nesta subcategoria.</p>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoryPage;
