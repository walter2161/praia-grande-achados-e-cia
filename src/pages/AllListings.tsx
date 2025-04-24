
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ListingGrid from "@/components/ListingGrid";
import { categories } from "@/data/mockData";
import { useSearchParams } from "react-router-dom";
import { fetchSheetData, SheetNames } from "@/utils/sheetsService";
import { Listing } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const AllListings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("busca") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortOption, setSortOption] = useState("recent");
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();
  
  // State for storing listings from the Google Sheets
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Update URL when search query changes
  useEffect(() => {
    if (searchQuery) {
      searchParams.set("busca", searchQuery);
    } else {
      searchParams.delete("busca");
    }
    setSearchParams(searchParams);
  }, [searchQuery, setSearchParams]);
  
  // Load listings from Google Sheets
  useEffect(() => {
    const loadListings = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch from Google Sheets
        const listings = await fetchSheetData<Listing>(SheetNames.LISTINGS);
        setAllListings(listings);
      } catch (error) {
        console.error("Error loading listings:", error);
        setError("Não foi possível carregar os anúncios. Por favor, tente novamente mais tarde.");
        
        toast({
          title: "Erro",
          description: "Não foi possível carregar os anúncios. Usando dados de demonstração.",
          variant: "destructive",
        });
        
        // Fallback to mock data
        try {
          const importedData = await import("@/data/mockData");
          // Type assertion to ensure compatibility with Listing[]
          setAllListings(importedData.allListings as Listing[]);
        } catch (err) {
          console.error("Error loading fallback data:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadListings();
  }, [toast]);
  
  // Filter listings based on search query
  const filterListings = (listings: Listing[]) => {
    if (!searchQuery.trim()) return listings;
    
    const query = searchQuery.toLowerCase().trim();
    return listings.filter(listing => {
      // Search in title
      if (listing.title.toLowerCase().includes(query)) return true;
      
      // Search in description
      if (listing.description && listing.description.toLowerCase().includes(query)) return true;
      
      // Search in brand and model for auto listings
      if (listing.category === "autos" && 
         ((listing.brand && listing.brand.toLowerCase().includes(query)) || 
          (listing.model && listing.model.toLowerCase().includes(query)))) {
        return true;
      }
      
      // Search in other relevant fields depending on listing type
      if (listing.category === "empregos" && listing.company_name && listing.company_name.toLowerCase().includes(query)) {
        return true;
      }
      
      return false;
    });
  };
  
  // Sort listings based on selected option
  const sortListings = (listings: Listing[]) => {
    const listingsCopy = [...listings];
    
    switch (sortOption) {
      case "recent":
        return listingsCopy.sort(
          (a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime()
        );
      case "priceAsc":
        return listingsCopy.sort((a, b) => {
          const priceA = "salary" in a ? a.salary : a.price;
          const priceB = "salary" in b ? b.salary : b.price;
          
          // Handle string prices (like "A combinar")
          if (typeof priceA === "string") return 1;
          if (typeof priceB === "string") return -1;
          
          return (priceA || 0) - (priceB || 0);
        });
      case "priceDesc":
        return listingsCopy.sort((a, b) => {
          const priceA = "salary" in a ? a.salary : a.price;
          const priceB = "salary" in b ? b.salary : b.price;
          
          // Handle string prices (like "A combinar")
          if (typeof priceA === "string") return 1;
          if (typeof priceB === "string") return -1;
          
          return (priceB || 0) - (priceA || 0);
        });
      default:
        return listingsCopy;
    }
  };
  
  // Process listings with filter and sort
  const processListings = (listings: Listing[]) => {
    const filtered = filterListings(listings);
    return sortListings(filtered);
  };
  
  // Get listings by category
  const getListingsByCategory = (categorySlug: string) => {
    return allListings.filter(listing => listing.category === categorySlug);
  };
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is already applied through the state change
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Todos os Anúncios</h1>
        
        <form onSubmit={handleSearch} className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar anúncios" 
              className="pl-10"
            />
          </div>
          
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Mais recentes</SelectItem>
              <SelectItem value="priceAsc">Menor preço</SelectItem>
              <SelectItem value="priceDesc">Maior preço</SelectItem>
            </SelectContent>
          </Select>
          
          <Button type="submit" className="md:hidden">Buscar</Button>
        </form>
        
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="all">Todos</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.slug}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {isLoading ? (
            <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          ) : (
            <>
              <TabsContent value="all">
                {processListings(allListings).length > 0 ? (
                  <ListingGrid listings={processListings(allListings)} />
                ) : (
                  <div className="text-center py-8">
                    <p className="text-lg">Nenhum anúncio encontrado com os termos de busca.</p>
                  </div>
                )}
              </TabsContent>
              
              {categories.map((category) => (
                <TabsContent key={category.id} value={category.slug}>
                  {processListings(getListingsByCategory(category.slug)).length > 0 ? (
                    <ListingGrid listings={processListings(getListingsByCategory(category.slug))} />
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-lg">
                        Nenhum anúncio de {category.name.toLowerCase()} encontrado com os termos de busca.
                      </p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </>
          )}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AllListings;
