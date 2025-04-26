import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Search, User, Plus, LogOut, Menu, ChevronDown } from "lucide-react";
import { Input } from "./ui/input";
import { useAuth } from "@/contexts/AuthContext";
import WeatherCapsule from "./WeatherCapsule";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/data/mockData";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, profile, logout, isAdmin, isAuthenticated } = useAuth();

  // Alinha o menu hambúrguer com a barra de busca
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/todos-anuncios?busca=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/todos-anuncios");
    }
  };

  // Mantém os links do menu para popover extra (reserva)
  const menuLinks = [
    { to: "/", label: "Início" },
    { to: "/todos-anuncios", label: "Todos Anúncios" },
    { to: "/criar-anuncio", label: "Anunciar" },
    { to: "/sobre", label: "Sobre" },
    { to: "/contato", label: "Contato" },
    { to: "/termos", label: "Termos de Uso" },
    { to: "/privacidade", label: "Privacidade" },
    ...(isAuthenticated() ? [{ to: "/perfil", label: "Meu Perfil" }] : []),
    ...(isAdmin() ? [{ to: "/admin", label: "Administração" }] : []),
    ...(isAuthenticated()
      ? [{ to: "#logout", label: "Sair", onClick: logout, danger: true }]
      : [{ to: "/login", label: "Entrar" }]),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-14 md:h-16 items-center justify-between px-2 sm:px-4 relative">
        {/* Left: logo - make it smaller on mobile */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <img
              src="/lovable-uploads/350c9a17-615f-4b3f-91d3-af25056c8f16.png"
              alt="Logo GuíaPG"
              className="h-8 md:h-10 max-h-10 w-auto object-contain"
              style={{ maxWidth: 140, width: 'auto' }}
            />
          </Link>
        </div>

        {/* Center: menu + search - adjust spacing */}
        <div className="flex items-center flex-1 justify-center min-w-[200px] max-w-full md:basis-1/2 px-1 md:px-2" style={{ flexBasis: "50%", minWidth: 0 }}>
          <DropdownMenu open={categoryMenuOpen} onOpenChange={setCategoryMenuOpen}>
            <DropdownMenuTrigger asChild>
              <button
                className="flex h-8 w-8 items-center justify-center ml-0 p-0 rounded-md"
                style={{ background: "none", border: "none", marginRight: 8 }}
                aria-label="Categorias"
              >
                <Menu className="h-6 w-6 text-[#F97316]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              side="bottom"
              sideOffset={0}
              className="w-[290px] p-0 border rounded-md bg-background z-[60] shadow-xl"
              style={{ marginTop: 4 }}
            >
              <div className="py-1">
                {categories.map((cat) => (
                  <div key={cat.slug} className="border-b last:border-b-0">
                    <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-accent text-foreground transition-all">
                      <cat.icon className="h-4 w-4 text-[#F97316]" />
                      <Link
                        to={`/categoria/${cat.slug}`}
                        className="font-medium text-sm flex-grow"
                        onClick={() => setCategoryMenuOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    </div>
                    
                    {cat.subcategories && cat.subcategories.length > 0 && (
                      <Accordion type="single" collapsible className="px-2">
                        <AccordionItem value={cat.slug} className="border-none">
                          <AccordionTrigger className="hover:no-underline px-2 py-1">
                            <span className="text-xs text-muted-foreground">
                              Ver subcategorias
                              <ChevronDown className="inline-block ml-2 h-3 w-3" />
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="pb-1 pt-0">
                            <div className="ml-6 space-y-0.5">
                              {cat.subcategories.map((sub) => (
                                <Link
                                  key={sub}
                                  to={`/categoria/${cat.slug}?subcategoria=${encodeURIComponent(sub)}`}
                                  className="block px-2 py-1 text-xs text-muted-foreground hover:text-foreground rounded hover:bg-accent/70 transition-all"
                                  onClick={() => setCategoryMenuOpen(false)}
                                >
                                  {sub}
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="
              hidden md:flex relative
              flex-1
              max-w-full
              min-w-[200px]
              ml-2
            "
            style={{
              minWidth: 200,
              width: "100%",
              maxWidth: "500px",
            }}
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar em Praia Grande"
              className="pl-10 w-full"
            />
          </form>
        </div>

        {/* Right: actions - compact layout for mobile */}
        <div className="flex items-center gap-1 md:gap-2">
          {isAuthenticated() ? (
            <Link to="/criar-anuncio">
              <Button className="hidden md:flex gap-2 bg-[#FF6600] hover:bg-[#FF6600]/90">
                <Plus className="h-4 w-4" />
                Anunciar
              </Button>
            </Link>
          ) : (
            <Link to="/login?redirect=/criar-anuncio">
              <Button className="hidden md:flex gap-2 bg-[#FF6600] hover:bg-[#FF6600]/90">
                <Plus className="h-4 w-4" />
                Anunciar
              </Button>
            </Link>
          )}

          {/* NOVO LINK PLANOS */}
          <Link to="/planos" className="text-foreground hover:text-primary text-sm">
            Planos
          </Link>
          
          <WeatherCapsule />
          
          {/* MOBILE: exibe o botão Planos no menu mobile */}
          <Link to="/planos" className="md:hidden">
            <Button size="icon" variant="ghost">
              <span className="font-bold text-sm">P</span>
            </Button>
          </Link>

          {isAuthenticated() ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm font-medium">
                  {profile?.username || user?.email}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/perfil">Meu Perfil</Link>
                </DropdownMenuItem>
                {isAdmin() && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">Painel Admin</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="outline">Entrar</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
