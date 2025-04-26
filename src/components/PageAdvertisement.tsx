
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Ad } from "@/types";

export default function PageAdvertisement() {
  const [ad, setAd] = useState<Ad | null>(null);
  const location = useLocation();
  
  useEffect(() => {
    const fetchAd = async () => {
      // Convert route to page_name format (e.g., /categoria/autos -> categoria/autos)
      let pageName = location.pathname.substring(1) || 'home';
      
      // First try to fetch specific ad for this exact page
      let { data: ads, error } = await supabase
        .from('page_ads')
        .select('*')
        .eq('page_name', pageName)
        .eq('is_active', true)
        .maybeSingle();
      
      // If no specific ad found for this page, try to get a generic category ad
      if (!ads && pageName.startsWith('categoria/')) {
        const { data: categoryAds, error: categoryError } = await supabase
          .from('page_ads')
          .select('*')
          .eq('page_name', 'categoria')
          .eq('is_active', true)
          .maybeSingle();
          
        if (!categoryError && categoryAds) {
          ads = categoryAds;
        }
      }
      
      // If still no ad found, try to get a default ad
      if (!ads) {
        const { data: defaultAds, error: defaultError } = await supabase
          .from('page_ads')
          .select('*')
          .eq('page_name', 'default')
          .eq('is_active', true)
          .maybeSingle();
          
        if (!defaultError && defaultAds) {
          ads = defaultAds;
        }
      }
      
      if (ads) {
        setAd(ads as Ad);
      }
      
      // Log the process for debugging
      console.log('Page ad fetch for:', pageName, ads ? 'found' : 'not found');
    };
    
    fetchAd();
  }, [location.pathname]);
  
  if (!ad) return null;
  
  return (
    <div className="container my-8">
      {ad.ad_type === 'banner_image' ? (
        <a 
          href={ad.link || '#'} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full"
        >
          <img 
            src={ad.content} 
            alt="Advertisement" 
            className="w-[1200px] h-[200px] object-cover rounded-lg shadow-md mx-auto"
          />
        </a>
      ) : (
        <div 
          className="w-[1200px] h-[200px] mx-auto"
          dangerouslySetInnerHTML={{ __html: ad.content }} 
        />
      )}
    </div>
  );
}
