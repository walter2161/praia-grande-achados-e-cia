
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Search, Bell, User, Plus, LogOut, Menu } from "lucide-react";
import { Input } from "./ui/input";
import { useAuth } from "@/contexts/AuthContext";
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
  const { user, logout, isAdmin, isAuthenticated } = useAuth();

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
      <div className="container flex h-16 items-center justify-between px-4 sm:px-4 relative">
        {/* Left: logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center ml-2">
            <img
              src="/lovable-uploads/350c9a17-615f-4b3f-91d3-af25056c8f16.png"
              alt="Logo GuíaPG"
              className="h-10 max-h-10 w-auto object-contain"
              style={{ maxWidth: 180 }}
            />
          </Link>
        </div>

        {/* Center: menu + search - now using flex-1 to allow 50% width */}
        <div
          className="
            flex items-center
            flex-1
            justify-center
            min-w-[200px]
            max-w-full
            md:basis-1/2
            px-2
          "
          style={{ flexBasis: "50%", minWidth: 0 }}
        >
          {/* Menu Hamburguer (Categorias c/ Subcategorias) */}
          <DropdownMenu open={categoryMenuOpen} onOpenChange={setCategoryMenuOpen}>
            <DropdownMenuTrigger asChild>
              <button
                className="flex h-10 w-10 items-center justify-center ml-0 p-0 rounded-md"
                style={{ background: "none", border: "none", marginRight: 10 }}
                aria-label="Categorias"
              >
                <Menu className="h-7 w-7 text-[#F97316]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              side="bottom"
              sideOffset={0}
              className="w-[290px] p-0 border rounded-md bg-background z-[60] shadow-xl"
              style={{ marginTop: 6 }}
            >
              <div className="py-2">
                {categories.map((cat) => (
                  <div key={cat.slug}>
                    <Link
                      to={`/categoria/${cat.slug}`}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-accent text-foreground transition-all"
                      onClick={() => setCategoryMenuOpen(false)}
                    >
                      <cat.icon className="h-5 w-5 text-[#F97316]" />
                      <span className="font-medium">{cat.name}</span>
                    </Link>
                    {/* Subcategorias */}
                    {cat.subcategories && cat.subcategories.length > 0 && (
                      <div className="ml-9 pt-1 pb-2">
                        {cat.subcategories.map((sub) => (
                          <Link
                            key={sub}
                            to={`/categoria/${cat.slug}?subcategoria=${encodeURIComponent(sub)}`}
                            className="block px-2 py-1 text-muted-foreground hover:text-foreground rounded hover:bg-accent/70 text-sm transition-all"
                            onClick={() => setCategoryMenuOpen(false)}
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Barra de busca */}
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

        {/* Right: actions */}
        <div className="flex items-center gap-2">
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

          {isAuthenticated() ? (
            <Link to="/criar-anuncio" className="md:hidden">
              <Button size="icon" variant="ghost">
                <Plus className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/login?redirect=/criar-anuncio" className="md:hidden">
              <Button size="icon" variant="ghost">
                <Plus className="h-5 w-5" />
              </Button>
            </Link>
          )}

          <Button size="icon" variant="ghost">
            <Bell className="h-5 w-5" />
          </Button>

          {isAuthenticated() ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm font-medium">
                  {user?.username}
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
