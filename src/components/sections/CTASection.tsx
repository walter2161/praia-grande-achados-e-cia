
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  bannerImage: string;
}

const CTASection = ({ bannerImage }: CTASectionProps) => {
  return (
    <section 
      className="relative py-16 overflow-hidden"
      style={{ minHeight: "320px" }}
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url("${bannerImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />
      
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundColor: 'rgba(255, 102, 0, 0.6)',
          mixBlendMode: 'overlay',
        }}
        aria-hidden="true"
      />
      
      <div className="container relative z-10 text-center space-y-6">
        <h2 className="text-3xl font-bold text-white">Tem algo para vender ou anunciar?</h2>
        <p className="text-xl max-w-2xl mx-auto text-gray-200">
          Anuncie gratuitamente e alcance milhares de pessoas em Praia Grande.
        </p>
        <Link to="/criar-anuncio">
          <Button size="lg" className="mt-4 bg-beach-600 hover:bg-beach-700">
            Criar Anúncio
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
