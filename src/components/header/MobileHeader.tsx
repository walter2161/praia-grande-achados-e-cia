
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import WeatherCapsule from "../WeatherCapsule";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MobileHeader = () => {
  const { user, profile, logout, isAdmin, isAuthenticated } = useAuth();

  return (
    <div className="w-full md:hidden bg-background">
      <div className="container flex items-center justify-between py-2 px-2 sm:px-4">
        <Link to="/" className="flex items-center">
          <img
            src="/lovable-uploads/350c9a17-615f-4b3f-91d3-af25056c8f16.png"
            alt="Logo GuíaPG"
            className="h-8 md:h-10 max-h-10 w-auto object-contain"
            style={{ maxWidth: 140, width: 'auto' }}
          />
        </Link>
        
        <div className="flex items-center gap-2">
          <Link to="/planos" className="text-foreground hover:text-primary text-sm whitespace-nowrap">
            Planos
          </Link>
          
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
    </div>
  );
};

export default MobileHeader;
