
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Ad {
  id: string;
  page_name: string;
  ad_type: 'google_adsense' | 'banner_image';
  content: string;
  link?: string | null;
  is_active: boolean;
}

export default function PageAdvertisement() {
  const [ad, setAd] = useState<Ad | null>(null);
  const location = useLocation();
  
  useEffect(() => {
    const fetchAd = async () => {
      // Convert route to page_name format (e.g., /categoria/autos -> categoria/autos)
      const pageName = location.pathname.substring(1) || 'home';
      
      const { data: ads, error } = await supabase
        .from('page_ads')
        .select('*')
        .eq('page_name', pageName)
        .eq('is_active', true)
        .single();
      
      if (!error && ads) {
        setAd(ads);
      }
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
            className="w-full h-auto rounded-lg shadow-md"
          />
        </a>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: ad.content }} />
      )}
    </div>
  );
}
