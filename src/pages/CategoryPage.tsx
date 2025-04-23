
import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import ListingGrid from "@/components/ListingGrid";
import Map from "@/components/Map";
import { categories } from "@/data/mockData";
import { Category, Listing, BarRestaurantListing, RealEstateListing } from "@/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { fetchSheetData, SheetNames } from "@/utils/sheetsService";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSubcategory = searchParams.get("subcategoria") ?? "todas";
  const finalidadeFromParams = searchParams.get("finalidade") ?? "todas";
  const [finalidade, setFinalidade] = useState<string>(finalidadeFromParams);
  const { toast } = useToast();
  
  // State for holding listings and loading state
  const [listings, setListings] = useState<Listing[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const category = categories.find(cat => cat.slug === slug) as Category;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    setFinalidade(finalidadeFromParams);
  }, [finalidadeFromParams, slug]);
  
  // Fetch listings from Google Sheets when category changes
  useEffect(() => {
    if (!category) return;
    
    const loadListings = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch listings from Google Sheets
        const data = await fetchSheetData<Listing>(SheetNames.LISTINGS);
        
        // Filter by category
        const filteredData = data.filter(listing => listing.category === category.slug);
        
        // Extract subcategories - fixing the type issue here by explicitly casting to string array
        const uniqueSubcategories = [...new Set(filteredData.map(item => 
          item.subcategory ? String(item.subcategory) : ''
        ).filter(Boolean))] as string[];
        
        setListings(filteredData);
        setSubcategories(uniqueSubcategories);
      } catch (error) {
        console.error("Error loading listings:", error);
        setError("Não foi possível carregar os anúncios. Por favor, tente novamente mais tarde.");
        
        toast({
          title: "Erro",
          description: "Não foi possível carregar os anúncios. Usando dados de demonstração.",
          variant: "destructive",
        });
        
        // Use mock data as fallback
        loadMockData();
      } finally {
        setIsLoading(false);
      }
    };
    
    // Function to load mock data when API fails
    const loadMockData = () => {
      try {
        let mockDataImport;
        
        // Use the correct mock data import based on category slug
        switch(category.slug) {
          case "autos":
            import("@/data/autoListings").then(module => {
              setListings(module.autoListings || []);
              const subcats = [...new Set((module.autoListings || []).map((item: any) => item.subcategory))] as string[];
              setSubcategories(subcats.filter(Boolean));
            });
            break;
          case "empregos":
            import("@/data/jobListings").then(module => {
              setListings(module.jobListings || []);
              const subcats = [...new Set((module.jobListings || []).map((item: any) => item.subcategory))] as string[];
              setSubcategories(subcats.filter(Boolean));
            });
            break;
          case "imoveis":
            import("@/data/realEstateListings").then(module => {
              setListings(module.realEstateListings || []);
              const subcats = [...new Set((module.realEstateListings || []).map((item: any) => item.subcategory))] as string[];
              setSubcategories(subcats.filter(Boolean));
            });
            break;
          case "servicos":
            import("@/data/serviceListings").then(module => {
              setListings(module.serviceListings || []);
              const subcats = [...new Set((module.serviceListings || []).map((item: any) => item.subcategory))] as string[];
              setSubcategories(subcats.filter(Boolean));
            });
            break;
          case "bares-restaurantes":
            import("@/data/baresRestaurantesListings").then(module => {
              setListings(module.baresRestaurantesListings || []);
              const subcats = [...new Set((module.baresRestaurantesListings || []).map((item: any) => item.subcategory))] as string[];
              setSubcategories(subcats.filter(Boolean));
            });
            break;
          case "itens":
            import("@/data/itensListings").then(module => {
              setListings(module.itensListings || []);
              const subcats = [...new Set((module.itensListings || []).map((item: any) => item.subcategory))] as string[];
              setSubcategories(subcats.filter(Boolean));
            });
            break;
          default:
            console.error("Unknown category slug:", category.slug);
        }
      } catch (err) {
        console.error("Error loading fallback data:", err);
      }
    };
    
    loadListings();
  }, [category, toast]);

  // Filters for real estate listings
  const finalidadeOptions = [
    { value: "todas", label: "Todas" },
    { value: "Locação", label: "Locação" },
    { value: "Venda", label: "Venda" },
    { value: "Troca", label: "Troca" }
  ];

  if (!category) {
    return (
      <MainLayout>
        <div className="container py-12">
          <h1 className="text-3xl font-bold mb-6">Categoria não encontrada</h1>
        </div>
      </MainLayout>
    );
  }

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

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border rounded-md p-4 space-y-3">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-lg text-destructive">{error}</p>
            <button 
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </button>
          </div>
        ) : filteredListings.length > 0 ? (
          <ListingGrid listings={filteredListings} />
        ) : (
          <p className="text-muted-foreground">Nenhum anúncio encontrado nesta subcategoria.</p>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoryPage;
