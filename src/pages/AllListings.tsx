
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ListingGrid from "@/components/ListingGrid";
import { 
  allListings, 
  autoListings, 
  jobListings, 
  realEstateListings, 
  serviceListings,
  categories 
} from "@/data/mockData";
import { useSearchParams } from "react-router-dom";

const AllListings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("busca") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortOption, setSortOption] = useState("recent");
  const [activeTab, setActiveTab] = useState("all");
  
  // Update URL when search query changes
  useEffect(() => {
    if (searchQuery) {
      searchParams.set("busca", searchQuery);
    } else {
      searchParams.delete("busca");
    }
    setSearchParams(searchParams);
  }, [searchQuery, setSearchParams]);
  
  // Filter listings based on search query
  const filterListings = (listings) => {
    if (!searchQuery.trim()) return listings;
    
    const query = searchQuery.toLowerCase().trim();
    return listings.filter(listing => {
      // Search in title
      if (listing.title.toLowerCase().includes(query)) return true;
      
      // Search in description
      if (listing.description.toLowerCase().includes(query)) return true;
      
      // Search in brand and model for auto listings
      if (listing.category === "autos" && 
         (listing.brand?.toLowerCase().includes(query) || 
          listing.model?.toLowerCase().includes(query))) {
        return true;
      }
      
      // Search in other relevant fields depending on listing type
      if (listing.category === "empregos" && 
          listing.companyName?.toLowerCase().includes(query)) {
        return true;
      }
      
      return false;
    });
  };
  
  // Sort listings based on selected option
  const sortListings = (listings) => {
    const listingsCopy = [...listings];
    
    switch (sortOption) {
      case "recent":
        return listingsCopy.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case "priceAsc":
        return listingsCopy.sort((a, b) => {
          const priceA = "salary" in a ? a.salary : a.price;
          const priceB = "salary" in b ? b.salary : b.price;
          
          // Handle string prices (like "A combinar")
          if (typeof priceA === "string") return 1;
          if (typeof priceB === "string") return -1;
          
          return priceA - priceB;
        });
      case "priceDesc":
        return listingsCopy.sort((a, b) => {
          const priceA = "salary" in a ? a.salary : a.price;
          const priceB = "salary" in b ? b.salary : b.price;
          
          // Handle string prices (like "A combinar")
          if (typeof priceA === "string") return 1;
          if (typeof priceB === "string") return -1;
          
          return priceB - priceA;
        });
      default:
        return listingsCopy;
    }
  };
  
  // Process listings with filter and sort
  const processListings = (listings) => {
    const filtered = filterListings(listings);
    return sortListings(filtered);
  };
  
  // Handle search submission
  const handleSearch = (e) => {
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
          
          <TabsContent value="all">
            {processListings(allListings).length > 0 ? (
              <ListingGrid listings={processListings(allListings)} />
            ) : (
              <div className="text-center py-8">
                <p className="text-lg">Nenhum anúncio encontrado com os termos de busca.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="autos">
            {processListings(autoListings).length > 0 ? (
              <ListingGrid listings={processListings(autoListings)} />
            ) : (
              <div className="text-center py-8">
                <p className="text-lg">Nenhum anúncio de automóveis encontrado com os termos de busca.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="empregos">
            {processListings(jobListings).length > 0 ? (
              <ListingGrid listings={processListings(jobListings)} />
            ) : (
              <div className="text-center py-8">
                <p className="text-lg">Nenhum anúncio de empregos encontrado com os termos de busca.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="imoveis">
            {processListings(realEstateListings).length > 0 ? (
              <ListingGrid listings={processListings(realEstateListings)} />
            ) : (
              <div className="text-center py-8">
                <p className="text-lg">Nenhum anúncio de imóveis encontrado com os termos de busca.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="servicos">
            {processListings(serviceListings).length > 0 ? (
              <ListingGrid listings={processListings(serviceListings)} />
            ) : (
              <div className="text-center py-8">
                <p className="text-lg">Nenhum anúncio de serviços encontrado com os termos de busca.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AllListings;
