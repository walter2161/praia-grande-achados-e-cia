
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
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, logout, isAdmin, isAuthenticated } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/todos-anuncios?busca=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/todos-anuncios");
    }
  };

  // Todas as rotas principais do site
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
      <div className="container flex h-16 items-center justify-between px-4 sm:px-4">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center ml-2">
            <img
              src="/lovable-uploads/350c9a17-615f-4b3f-91d3-af25056c8f16.png"
              alt="Logo GuíaPG"
              className="h-10 max-h-10 w-auto object-contain"
              style={{ maxWidth: 180 }}
            />
          </Link>

          {/* Botão Hamburguer - Visível em desktop e mobile */}
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-accent hover:bg-accent/80 transition"
                aria-label="Menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </DrawerTrigger>
            <DrawerContent className="max-w-[340px] mx-auto">
              <DrawerHeader>
                <DrawerTitle>Menu</DrawerTitle>
              </DrawerHeader>
              <nav className="flex flex-col gap-2 px-4 pb-4">
                {menuLinks.map((link) =>
                  link.to === "#logout" ? (
                    <button
                      key={link.label}
                      onClick={() => {
                        setDrawerOpen(false);
                        logout();
                      }}
                      className="text-left w-full px-4 py-2 rounded hover:bg-destructive/10 text-destructive font-medium"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setDrawerOpen(false)}
                      className={`block px-4 py-2 rounded hover:bg-accent/80 text-foreground ${link.danger ? "text-destructive" : ""}`}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>
            </DrawerContent>
          </Drawer>
        </div>
        
        {/* Rest of the existing header code remains the same */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex relative w-1/3"
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar em Praia Grande"
            className="pl-10"
          />
        </form>
        
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

