
import React from 'react';
import { Link } from "react-router-dom";
import { Menu, ChevronDown } from "lucide-react";
import { categories } from "@/data/mockData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CategoryMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ isOpen, onOpenChange }) => {
  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          className="flex h-8 w-8 items-center justify-center p-0 rounded-md"
          style={{ background: "none", border: "none" }}
          aria-label="Categorias"
        >
          <Menu className="h-6 w-6 text-[#F97316]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="bottom"
        sideOffset={0}
        className="w-[290px] p-0 border rounded-md bg-background z-[60] shadow-xl"
        style={{ marginTop: 4 }}
      >
        <div className="py-1">
          {categories.map((cat) => (
            <div key={cat.slug} className="border-b last:border-b-0">
              <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-accent text-foreground transition-all">
                <cat.icon className="h-4 w-4 text-[#F97316]" />
                <Link
                  to={`/categoria/${cat.slug}`}
                  className="font-medium text-sm flex-grow"
                  onClick={() => onOpenChange(false)}
                >
                  {cat.name}
                </Link>
              </div>
              
              {cat.subcategories && cat.subcategories.length > 0 && (
                <Accordion type="single" collapsible className="px-2">
                  <AccordionItem value={cat.slug} className="border-none">
                    <AccordionTrigger className="hover:no-underline px-2 py-1">
                      <span className="text-xs text-muted-foreground">
                        Ver subcategorias
                        <ChevronDown className="inline-block ml-2 h-3 w-3" />
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-1 pt-0">
                      <div className="ml-6 space-y-0.5">
                        {cat.subcategories.map((sub) => (
                          <Link
                            key={sub}
                            to={`/categoria/${cat.slug}?subcategoria=${encodeURIComponent(sub)}`}
                            className="block px-2 py-1 text-xs text-muted-foreground hover:text-foreground rounded hover:bg-accent/70 transition-all"
                            onClick={() => onOpenChange(false)}
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryMenu;
