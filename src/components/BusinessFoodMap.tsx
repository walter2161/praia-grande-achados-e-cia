
import React, { useEffect, useState } from 'react';
import { Building, Utensils } from 'lucide-react';
import Map from './Map';
import { getListingsByCategory } from '@/lib/supabase';
import type { Listing } from '@/types';

const BusinessFoodMap = () => {
  const [businesses, setBusinesses] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Fetch all businesses, including those with "Bares e Restaurantes" subcategory
        const businessListings = await getListingsByCategory('empresas');
        // Ensure proper type casting with status as union type
        setBusinesses((businessListings || []).map(listing => ({
          ...listing,
          status: listing.status as 'active' | 'inactive' | 'pending' | 'rejected'
        })) as Listing[]);
      } catch (error) {
        console.error('Error fetching listings for map:', error);
      }
    };

    fetchListings();
  }, []);

  // Combine all listings and format them for the map
  const mapPins = businesses
    .filter(listing => listing.latitude && listing.longitude)
    .map(listing => ({
      latitude: listing.latitude!,
      longitude: listing.longitude!,
      title: listing.title,
      category: listing.subcategory,
      icon: listing.subcategory === 'Bares e Restaurantes' ? Utensils : Building
    }));

  return (
    <section className="py-12 bg-gray-50">
      <div className="container space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Empresas em Praia Grande</h2>
          <p className="text-muted-foreground">
            Encontre os melhores estabelecimentos da cidade
          </p>
        </div>
        
        <div className="h-[500px] rounded-lg overflow-hidden shadow-lg">
          <Map 
            pins={mapPins} 
            height="500px"
            initialCenter={[-24.00857, -46.41298]} // Praia Grande coordinates
            zoom={13}
          />
        </div>

        <div className="flex justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Utensils className="h-4 w-4 text-beach-600" />
            <span>Bares e Restaurantes</span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-beach-600" />
            <span>Empresas</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessFoodMap;
