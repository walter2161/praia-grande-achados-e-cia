import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Search, Bell, User, Plus } from "lucide-react";
import { Input } from "./ui/input";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/350c9a17-615f-4b3f-91d3-af25056c8f16.png" 
              alt="350c9a17-615f-4b3f-91d3-af25056c8f16.png" 
              className="w-[300px] h-auto object-contain p-2"
            />
          </Link>
        </div>
        
        <div className="hidden md:flex relative w-1/3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Buscar em Praia Grande" 
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Link to="/criar-anuncio">
            <Button className="hidden md:flex gap-2 bg-[#FF6600] hover:bg-[#FF6600]/90">
              <Plus className="h-4 w-4" />
              Anunciar
            </Button>
          </Link>
          <Link to="/criar-anuncio" className="md:hidden">
            <Button size="icon" variant="ghost">
              <Plus className="h-5 w-5" />
            </Button>
          </Link>
          <Button size="icon" variant="ghost">
            <Bell className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
