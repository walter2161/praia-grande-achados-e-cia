
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Search, User, LogOut } from "lucide-react";
import { Input } from "../ui/input";
import { useAuth } from "@/contexts/AuthContext";
import WeatherCapsule from "../WeatherCapsule";
import CategoryMenu from "./CategoryMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DesktopHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, profile, logout, isAdmin, isAuthenticated } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/todos-anuncios?busca=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/todos-anuncios");
    }
  };

  return (
    <div className="hidden md:flex w-full items-center container py-2 px-4">
      {/* Left section with logo */}
      <div className="flex-shrink-0 mr-4">
        <Link to="/" className="flex items-center">
          <img
            src="/lovable-uploads/350c9a17-615f-4b3f-91d3-af25056c8f16.png"
            alt="Logo GuíaPG"
            className="h-8 md:h-[42px] max-h-[42px] w-auto object-contain"
            style={{ maxWidth: 147, width: 'auto' }}
          />
        </Link>
      </div>
      
      {/* Centered section with menu, search, anunciar, and planos */}
      <div className="flex-1 flex items-center justify-center gap-4">
        <div className="flex items-center relative">
          <CategoryMenu isOpen={categoryMenuOpen} onOpenChange={setCategoryMenuOpen} />
          
          <form onSubmit={handleSearch} className="relative min-w-[200px] max-w-[500px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar em Praia Grande"
              className="pl-10 w-full"
            />
          </form>
        </div>

        <Link to={isAuthenticated() ? "/criar-anuncio" : "/login?redirect=/criar-anuncio"}>
          <Button className="bg-[#FF6600] hover:bg-[#FF6600]/90 flex gap-2">
            Anunciar
          </Button>
        </Link>
        
        <Link to="/planos" className="text-foreground hover:text-primary text-sm">
          Planos
        </Link>
      </div>
      
      {/* Right section with weather and user */}
      <div className="flex items-center gap-2 ml-4 flex-shrink-0">
        <WeatherCapsule />

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
  );
};

export default DesktopHeader;
