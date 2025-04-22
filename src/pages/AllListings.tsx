
import { useState } from "react";
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

const AllListings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  
  // Sort listings based on selected option
  const sortListings = (listings: typeof allListings) => {
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
  
  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Todos os Anúncios</h1>
        
        <div className="mb-8 flex flex-col md:flex-row gap-4">
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
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="all">Todos</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.slug}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all">
            <ListingGrid listings={sortListings(allListings)} />
          </TabsContent>
          
          <TabsContent value="autos">
            <ListingGrid listings={sortListings(autoListings)} />
          </TabsContent>
          
          <TabsContent value="empregos">
            <ListingGrid listings={sortListings(jobListings)} />
          </TabsContent>
          
          <TabsContent value="imoveis">
            <ListingGrid listings={sortListings(realEstateListings)} />
          </TabsContent>
          
          <TabsContent value="servicos">
            <ListingGrid listings={sortListings(serviceListings)} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AllListings;
