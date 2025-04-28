
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Search, Menu } from "lucide-react";
import { Input } from "../ui/input";
import { useAuth } from "@/contexts/AuthContext";
import CategoryMenu from "./CategoryMenu";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const MobileSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const isScrolled = useScrollPosition(80);

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
          {/* Menu button and Category Menu */}
          <CategoryMenu isOpen={categoryMenuOpen} onOpenChange={setCategoryMenuOpen} />
          
          {/* Search form - Integrated on the same line */}
          <form
            onSubmit={handleSearch}
            className="relative flex-1"
          >
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar em Praia Grande"
                className="pl-10 w-full"
              />
            </div>
          </form>
        </div>

        {/* Announce button */}
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
