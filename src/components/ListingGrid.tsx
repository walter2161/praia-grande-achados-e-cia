
import React from "react";
import ListingCard from "./ListingCard";
import { Listing } from "@/types";

type ListingGridProps = {
  listings: Listing[];
  title?: string;
};

const ListingGrid: React.FC<ListingGridProps> = ({ listings, title }) => {
  return (
    <div className="space-y-4">
      {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default ListingGrid;
