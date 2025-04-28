
import { useState, useEffect } from "react";
import { getRandomBannerImage } from "@/lib/supabase";

export function useBannerImages() {
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

  return {
    randomBanner,
    ctaBanner
  };
}
