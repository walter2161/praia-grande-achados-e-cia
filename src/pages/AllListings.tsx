
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import ListingGrid from "@/components/ListingGrid";
import { getListings } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Listing } from "@/types";
import { allListings } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

const AllListings = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearchQuery = searchParams.get("busca") || "";
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [sortOption, setSortOption] = useState<string>("date-desc");
  const [priceRange, setPriceRange] = useState<[number | null, number | null]>([
    null,
    null,
  ]);

  const { data: listingsData = [], error: listingsError } = useQuery({
    queryKey: ['listings'],
    queryFn: getListings
  });

  // Use mock data if there's an error from the API
  const listings: Listing[] = listingsError ? 
    (allListings as unknown as Listing[]).map(listing => ({
      ...listing,
      status: listing.status as "active" | "inactive" | "pending" | "rejected"
    })) : 
    (listingsData as unknown as Listing[]);

  // Log errors to help with debugging
  if (listingsError) {
    console.error("Error fetching listings:", listingsError);
  }

  const form = useForm({
    defaultValues: {
      minPrice: "",
      maxPrice: "",
      category: "all",
      location: "",
    },
  });

  useEffect(() => {
    filterListings();
  }, [searchQuery, sortOption, priceRange, listings]);

  const filterListings = () => {
    let filtered = [...listings];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query) ||
          (listing.description &&
            listing.description.toLowerCase().includes(query)) ||
          listing.category.toLowerCase().includes(query)
      );
    }

    // Filter by price range
    if (priceRange[0] !== null) {
      filtered = filtered.filter((listing) => {
        const price = typeof listing.price === 'number' ? listing.price : 0;
        return price >= (priceRange[0] || 0);
      });
    }

    if (priceRange[1] !== null) {
      filtered = filtered.filter((listing) => {
        const price = typeof listing.price === 'number' ? listing.price : 0;
        return price <= (priceRange[1] || Infinity);
      });
    }

    // Sort listings
    switch (sortOption) {
      case "price-asc":
        filtered.sort((a, b) => {
          const priceA = typeof a.price === 'number' ? a.price : 0;
          const priceB = typeof b.price === 'number' ? b.price : 0;
          return priceA - priceB;
        });
        break;
      case "price-desc":
        filtered.sort((a, b) => {
          const priceA = typeof a.price === 'number' ? a.price : 0;
          const priceB = typeof b.price === 'number' ? b.price : 0;
          return priceB - priceA;
        });
        break;
      case "date-asc":
        filtered.sort(
          (a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case "date-desc":
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
    }

    setFilteredListings(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterListings();
  };

  const handleFilter = (values: any) => {
    const min = values.minPrice ? parseFloat(values.minPrice) : null;
    const max = values.maxPrice ? parseFloat(values.maxPrice) : null;
    setPriceRange([min, max]);
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Todos os Anúncios</h1>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          {/* Sidebar filters */}
          <div className="space-y-6">
            <div className="bg-card p-4 rounded-lg border">
              <h2 className="font-medium text-lg mb-4">Filtros</h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleFilter)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="minPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preço mínimo</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="R$ Min"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preço máximo</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="R$ Max"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    <Filter className="mr-2 h-4 w-4" /> Aplicar Filtros
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          {/* Main content */}
          <div className="space-y-6">
            {/* Search and sort */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <form onSubmit={handleSearch} className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar anúncios..."
                  className="pl-9"
                />
              </form>

              <Select
                value={sortOption}
                onValueChange={(value) => setSortOption(value)}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Mais recentes</SelectItem>
                  <SelectItem value="date-asc">Mais antigos</SelectItem>
                  <SelectItem value="price-asc">Menor preço</SelectItem>
                  <SelectItem value="price-desc">Maior preço</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results */}
            {filteredListings.length > 0 ? (
              <ListingGrid listings={filteredListings} />
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">
                  Nenhum anúncio encontrado
                </h3>
                <p className="text-muted-foreground">
                  Tente outros termos ou remova alguns filtros
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AllListings;
