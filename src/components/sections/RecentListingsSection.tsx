
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ListingGrid from "@/components/ListingGrid";
import { Listing } from "@/types";

interface RecentListingsSectionProps {
  listings: Listing[];
}

const RecentListingsSection = ({ listings }: RecentListingsSectionProps) => {
  return (
    <section className="py-8 md:py-12">
      <div className="container space-y-6 md:space-y-8 px-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Anúncios Recentes</h2>
          <Link to="/todos-anuncios">
            <Button variant="outline">Ver Todos</Button>
          </Link>
        </div>
        
        {listings.length > 0 ? (
          <ListingGrid listings={listings} />
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">Nenhum anúncio encontrado. Seja o primeiro a anunciar!</p>
            <Link to="/criar-anuncio" className="mt-4 inline-block">
              <Button className="mt-2">Criar Anúncio</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentListingsSection;
