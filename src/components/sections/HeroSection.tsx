
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HeroSection = ({ bannerImage }: { bannerImage: string }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/todos-anuncios?busca=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/todos-anuncios");
    }
  };

  return (
    <section 
      className="relative bg-gradient-to-b from-[#FF6600] to-[#FF6600]/80 text-white py-8 md:py-16 overflow-hidden"
      style={{
        minHeight: "320px",
        maxHeight: "420px",
      }}
    >
      <div
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "linear-gradient(180deg, rgba(255,102,0,0.15) 0%, rgba(255,102,0,0.15) 80%)",
          zIndex: 1,
        }}
      />
      
      <div className="container relative z-10 text-center space-y-4 md:space-y-6 px-4">
        <h1 className="text-3xl md:text-5xl font-bold">
          Compre, venda e encontre tudo em Praia Grande
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          O melhor guia local de produtos e serviços para todas as suas necessidades.
        </p>
        
        <form onSubmit={handleSearch} className="relative max-w-md mx-auto mt-8">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="O que você procura?" 
            className="pl-10 h-12 bg-white text-black"
          />
          <Button 
            type="submit"
            className="absolute right-0 top-0 h-12 rounded-l-none bg-[#FF6600] hover:bg-[#FF6600]/90"
            size="lg"
          >
            Buscar
          </Button>
        </form>
        
        <div className="mt-6">
          <Link to="/criar-anuncio">
            <Button size="lg" variant="secondary" className="font-semibold bg-white text-[#FF6600] hover:bg-gray-100">
              Anunciar Grátis
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
