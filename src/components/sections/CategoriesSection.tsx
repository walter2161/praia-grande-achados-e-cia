
import { Category } from "@/types";
import CategoryCard from "@/components/CategoryCard";

interface CategoriesSectionProps {
  categories: Category[];
}

const CategoriesSection = ({ categories }: CategoriesSectionProps) => {
  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="container space-y-6 md:space-y-8 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Navegue por Categorias</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {categories.slice(0, 6).map((category) => (
            <CategoryCard 
              key={category.id} 
              category={category}
              showSubcategoriesButton={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
