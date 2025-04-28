
import { useQuery } from "@tanstack/react-query";
import { getListings } from "@/lib/supabase";
import { Listing } from "@/types";

export function useRecentListings(limit: number = 8) {
  const { data: listingsData = [], error: listingsError } = useQuery({
    queryKey: ['recentListings'],
    queryFn: getListings
  });

  // Get the most recent listings
  const listings: Listing[] = listingsData as unknown as Listing[];
  const recentListings = listings.slice(0, limit);

  return {
    listings: recentListings,
    error: listingsError,
    isLoading: !listingsData && !listingsError
  };
}
