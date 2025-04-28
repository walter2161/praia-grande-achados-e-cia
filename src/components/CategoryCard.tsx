
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Category } from "@/types";
import { 
  FaCar, 
  FaBriefcase, 
  FaHome, 
  FaCog, 
  FaBox,
  FaStore,
  FaUtensils,
  FaHammer,
  FaBookOpen,
  FaPlus
} from "react-icons/fa";

const iconMap: { [key: string]: React.ComponentType } = {
  // Mapeamento correto baseado no nome da categoria
  AUTOS: FaCar,
  EMPREGOS: FaBriefcase,
  IMÓVEIS: FaHome,
  EMPRESAS: FaStore,
  SERVIÇOS: FaHammer,
  ITENS: FaBox,
  // Mapeamento baseado no ícone original
  Car: FaCar,
  Briefcase: FaBriefcase,
  House: FaHome,
  Settings: FaCog,
  Package: FaBox,
  Store: FaStore
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
      return <IconComponent className="h-8 w-8 md:h-12 md:w-12 mb-2 md:mb-4 text-beach-600" />;
    }
    
    // Se não encontrar pelo nome, tentar pelo valor do ícone, se for string
    if (typeof icon === 'string' && iconMap[icon]) {
      const IconComponent = iconMap[icon];
      return <IconComponent className="h-8 w-8 md:h-12 md:w-12 mb-2 md:mb-4 text-beach-600" />;
    }
    
    // Fallback para ícone padrão
    return <FaPlus className="h-8 w-8 md:h-12 md:w-12 mb-2 md:mb-4 text-beach-600" />;
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
