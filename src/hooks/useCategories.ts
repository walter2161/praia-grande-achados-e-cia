
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/supabase";
import { Category } from "@/types";
import { LucideIcon } from "lucide-react";

export function useCategories() {
  const { data: categoriesData = [], error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  // Format categories data
  const categories: Category[] = categoriesData.map((category: any) => {
    if (typeof category.icon === 'string') {
      return {
        ...category,
        icon: category.icon
      };
    }
    return {
      ...category,
      icon: category.icon?.name || "Package"
    };
  });

  return {
    categories,
    error: categoriesError,
    isLoading: !categories && !categoriesError
  };
}
