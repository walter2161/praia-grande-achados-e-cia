
import { useState, useEffect } from "react";
import { getCategories, getListings, getRandomBannerImage } from '@/lib/supabase';
import { useQuery } from "@tanstack/react-query";
import { Category, Listing } from "@/types";
import MainLayout from "@/components/layout/MainLayout";
import BusinessFoodMap from '@/components/BusinessFoodMap';
import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import RecentListingsSection from "@/components/sections/RecentListingsSection";
import CTASection from "@/components/sections/CTASection";

const Index = () => {
  const [randomBanner, setRandomBanner] = useState('');
  const [ctaBanner, setCtaBanner] = useState('');

  useEffect(() => {
    const fetchBanners = async () => {
      const topBanner = await getRandomBannerImage();
      const bottomBanner = await getRandomBannerImage();
      setRandomBanner(topBanner);
      setCtaBanner(bottomBanner);
    };

    fetchBanners();
  }, []);

  const { data: categoriesData = [], error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  const { data: listingsData = [], error: listingsError } = useQuery({
    queryKey: ['recentListings'],
    queryFn: getListings
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

  // Get the 8 most recent listings
  const listings: Listing[] = listingsData as unknown as Listing[];
  const recentListings = listings.slice(0, 8);

  // Log errors to help with debugging
  if (categoriesError) {
    console.error("Error fetching categories:", categoriesError);
  }
  
  if (listingsError) {
    console.error("Error fetching listings:", listingsError);
  }

  return (
    <MainLayout>
      <HeroSection bannerImage={randomBanner} />
      <CategoriesSection categories={categories} />
      <RecentListingsSection listings={recentListings} />
      <BusinessFoodMap />
      <CTASection bannerImage={ctaBanner} />
    </MainLayout>
  );
};

export default Index;
