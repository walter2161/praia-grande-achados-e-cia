
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Category } from "@/types";

type CategoryCardProps = {
  category: Category;
  showSubcategoriesButton?: boolean; // novo: permite controlar se mostra subcategoria
};

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  showSubcategoriesButton = true,
}) => {
  const { name, icon: Icon, slug, subcategories } = category;
  const [showSubcategories, setShowSubcategories] = useState(false);

  return (
    <div>
      <Link to={`/categoria/${slug}`}>
        <Card className="transition-all hover:shadow-md hover:-translate-y-1">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Icon className="h-12 w-12 mb-4 text-beach-600" />
            <h3 className="text-xl font-semibold text-center">{name}</h3>
            {showSubcategoriesButton &&
              subcategories &&
              subcategories.length > 0 && (
                <button
                  onClick={e => {
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
              {subcategories.map(subcategory => (
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

