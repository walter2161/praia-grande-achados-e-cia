
import MainLayout from "@/components/layout/MainLayout";
import BusinessFoodMap from '@/components/BusinessFoodMap';
import HeroSection from "@/components/sections/HeroSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import RecentListingsSection from "@/components/sections/RecentListingsSection";
import CTASection from "@/components/sections/CTASection";
import { useCategories } from "@/hooks/useCategories";
import { useRecentListings } from "@/hooks/useRecentListings";
import { useBannerImages } from "@/hooks/useBannerImages";

const Index = () => {
  const { categories, error: categoriesError } = useCategories();
  const { listings: recentListings, error: listingsError } = useRecentListings(8);
  const { randomBanner, ctaBanner } = useBannerImages();

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
