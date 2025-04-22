
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Category } from "@/types";

type CategoryCardProps = {
  category: Category;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { name, icon: Icon, slug } = category;

  return (
    <Link to={`/categoria/${slug}`}>
      <Card className="transition-all hover:shadow-md hover:-translate-y-1">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Icon className="h-12 w-12 mb-4 text-beach-600" />
          <h3 className="text-xl font-semibold">{name}</h3>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
