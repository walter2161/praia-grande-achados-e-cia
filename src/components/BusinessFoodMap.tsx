
import React, { useEffect, useState } from 'react';
import { Building, Utensils } from 'lucide-react';
import Map from './Map';
import { getListingsByCategory } from '@/lib/supabase';
import type { Listing } from '@/types';

const BusinessFoodMap = () => {
  const [businesses, setBusinesses] = useState<Listing[]>([]);
  const [foodPlaces, setFoodPlaces] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Fetch bars and restaurants
        const foodListings = await getListingsByCategory('bares-restaurantes');
        setFoodPlaces(foodListings as Listing[]);

        // Fetch businesses
        const businessListings = await getListingsByCategory('empresas');
        setBusinesses(businessListings as Listing[]);
      } catch (error) {
        console.error('Error fetching listings for map:', error);
      }
    };

    fetchListings();
  }, []);

  // Combine all listings and format them for the map
  const mapPins = [...businesses, ...foodPlaces]
    .filter(listing => listing.latitude && listing.longitude)
    .map(listing => ({
      latitude: listing.latitude!,
      longitude: listing.longitude!,
      title: listing.title,
      category: listing.category,
      icon: listing.category === 'empresas' ? Building : Utensils
    }));

  return (
    <section className="py-12 bg-gray-50">
      <div className="container space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Empresas e Gastronomia em Praia Grande</h2>
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
