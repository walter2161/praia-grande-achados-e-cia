
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Category } from "@/types";

type CategoryCardProps = {
  category: Category;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { name, icon: Icon, slug, subcategories, hierarchy } = category as any;
  const [showSubcategories, setShowSubcategories] = useState(false);

  const renderImoveisNestedMenu = () => {
    if (!hierarchy) return null;
    return (
      <div className="mt-2 p-2 bg-background border rounded-md shadow-sm">
        <ul className="space-y-1">
          {hierarchy.map((lvl1: any) => (
            <li key={lvl1.label}>
              <span className="font-semibold">{lvl1.label}</span>
              <ul className="pl-3 space-y-1">
                {lvl1.children.map((lvl2: any) => (
                  <li key={lvl2.label}>
                    <span>{lvl2.label}</span>
                    <ul className="pl-3 flex flex-wrap gap-1">
                      {lvl2.children.map((lvl3: string) => (
                        <li key={lvl3}>
                          <Link
                            to={`/categoria/${slug}?tipo=${encodeURIComponent(lvl1.label)}&imovel=${encodeURIComponent(
                              lvl2.label
                            )}&estado=${encodeURIComponent(lvl3)}`}
                            className="inline-block px-2 py-0.5 bg-muted rounded hover:bg-accent text-xs mt-1"
                          >
                            {lvl3}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <Link to={`/categoria/${slug}`}>
        <Card className="transition-all hover:shadow-md hover:-translate-y-1">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Icon className="h-12 w-12 mb-4 text-beach-600" />
            <h3 className="text-xl font-semibold text-center">{name}</h3>
            {/* Subcategories button should only show for categories with subcategories and NOT 'imoveis' */}
            {slug !== "imoveis" && subcategories && subcategories.length > 0 && (
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
            {/* For imóveis/imoveis, always show button for nested menu */}
            {slug === "imoveis" && (
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
                {showSubcategories ? "Ocultar" : "Filtrar imóveis"}
              </button>
            )}
          </CardContent>
        </Card>
      </Link>
      {/* Render subcategories for normal cats, nested/hierarchical one for imóveis */}
      {showSubcategories &&
        slug !== "imoveis" &&
        subcategories &&
        subcategories.length > 0 && (
          <div className="mt-2 p-2 bg-background border rounded-md shadow-sm">
            <ul className="space-y-1">
              {subcategories.map((subcategory) => (
                <li key={subcategory}>
                  <Link
                    to={`/categoria/${slug}?subcategory=${encodeURIComponent(subcategory)}`}
                    className="block px-3 py-1.5 rounded-md hover:bg-accent text-sm"
                  >
                    {subcategory}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      {showSubcategories && slug === "imoveis" && renderImoveisNestedMenu()}
    </div>
  );
};

export default CategoryCard;
