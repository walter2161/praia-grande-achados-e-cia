
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { ChevronDown, ChevronUp, Car, Briefcase, Home, Settings, Package, Store, Utensils, Hammer, BookOpen, Plus } from "lucide-react";
import { Category } from "@/types";
import { LucideIcon } from "lucide-react";

// Update icon map with proper typings to use Lucide icons
const iconMap: Record<string, LucideIcon> = {
  // Mapeamento correto baseado no nome da categoria
  AUTOS: Car,
  EMPREGOS: Briefcase,
  IMÓVEIS: Home,
  EMPRESAS: Store,
  SERVIÇOS: Hammer,
  ITENS: Package,
  // Mapeamento baseado no ícone original
  Car: Car,
  Briefcase: Briefcase,
  House: Home,
  Settings: Settings,
  Package: Package,
  Store: Store
};

type CategoryCardProps = {
  category: Category;
  showSubcategoriesButton?: boolean;
};

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  showSubcategoriesButton = true,
}) => {
  const { name, icon, slug, subcategories } = category;
  const [showSubcategories, setShowSubcategories] = React.useState(false);

  const renderIcon = () => {
    // Primeiro, tentar encontrar o ícone pelo nome da categoria
    if (iconMap[name]) {
      const IconComponent = iconMap[name];
      return (
        <div className="h-12 w-12 md:h-16 md:w-16 mb-2 md:mb-4 text-beach-600 flex items-center justify-center">
          <IconComponent className="w-full h-full" strokeWidth={1.5} />
        </div>
      );
    }
    
    // Se não encontrar pelo nome, tentar pelo valor do ícone, se for string
    if (typeof icon === 'string' && iconMap[icon]) {
      const IconComponent = iconMap[icon];
      return (
        <div className="h-12 w-12 md:h-16 md:w-16 mb-2 md:mb-4 text-beach-600 flex items-center justify-center">
          <IconComponent className="w-full h-full" strokeWidth={1.5} />
        </div>
      );
    }
    
    // Fallback para ícone padrão
    return (
      <div className="h-12 w-12 md:h-16 md:w-16 mb-2 md:mb-4 text-beach-600 flex items-center justify-center">
        <Plus className="w-full h-full" strokeWidth={1.5} />
      </div>
    );
  };

  return (
    <div>
      <Link to={`/categoria/${slug}`}>
        <Card className="transition-all hover:shadow-md hover:-translate-y-1">
          <CardContent className="flex flex-col items-center justify-center p-3 md:p-6">
            {renderIcon()}
            <h3 className="text-base md:text-xl font-semibold text-center">{name}</h3>
            {showSubcategoriesButton &&
              subcategories &&
              subcategories.length > 0 && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowSubcategories(!showSubcategories);
                  }}
                  className="mt-2 text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  {showSubcategories ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                  {showSubcategories ? "Ocultar" : "Ver subcategorias"}
                </button>
              )}
          </CardContent>
        </Card>
      </Link>
      {showSubcategoriesButton &&
        showSubcategories &&
        subcategories &&
        subcategories.length > 0 && (
          <div className="mt-2 p-2 bg-background border rounded-md shadow-sm">
            <ul className="space-y-1">
              {subcategories.map((subcategory) => (
                <li key={subcategory}>
                  <Link
                    to={`/categoria/${slug}?subcategory=${encodeURIComponent(
                      subcategory
                    )}`}
                    className="block px-3 py-1.5 rounded-md hover:bg-accent text-sm"
                  >
                    {subcategory}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};

export default CategoryCard;
