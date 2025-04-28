
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Search, Menu } from "lucide-react";
import { Input } from "../ui/input";
import { useAuth } from "@/contexts/AuthContext";
import CategoryMenu from "./CategoryMenu";

const MobileSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/todos-anuncios?busca=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/todos-anuncios");
    }
  };

  return (
    <div className="md:hidden sticky top-0 z-50 bg-background border-t shadow-sm">
      <div className="container flex items-center gap-2 py-2 px-2 sm:px-4">
        <div className="flex items-center gap-2">
          {/* Favicon first */}
          <Link to="/" className="flex items-center">
            <img
              src="/lovable-uploads/8b19a879-d092-4f91-b356-9a3930d28679.png"
              alt="Logo GuíaPG"
              className="h-6 w-6 object-contain"
            />
          </Link>
          
          {/* Menu second */}
          <CategoryMenu isOpen={categoryMenuOpen} onOpenChange={setCategoryMenuOpen} />
        </div>

        {/* Search third */}
        <form
          onSubmit={handleSearch}
          className="flex-1 relative"
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar em Praia Grande"
            className="pl-10 w-full"
          />
        </form>

        {/* Announce button fourth */}
        {isAuthenticated() ? (
          <Link to="/criar-anuncio">
            <Button className="whitespace-nowrap bg-[#FF6600] hover:bg-[#FF6600]/90">
              Anunciar
            </Button>
          </Link>
        ) : (
          <Link to="/login?redirect=/criar-anuncio">
            <Button className="whitespace-nowrap bg-[#FF6600] hover:bg-[#FF6600]/90">
              Anunciar
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileSearchBar;
