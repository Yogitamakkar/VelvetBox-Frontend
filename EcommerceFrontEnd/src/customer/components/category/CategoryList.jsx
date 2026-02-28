import CategoryCard from "./CategoryCard";

const CategoriesList = ({ 
  categories = [], 
  onCategoryClick,
  className = "",
  cols = 6,
  gap = 4 ,
  title 
}) => {
  
  return (
    <div className={`overflow-x-auto scrollbar-hide ${className}`}>
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      <div className={`flex lg:grid
          gap-${gap}
          flex-nowrap lg:grid-cols-6
          px-3 sm:px-3 md:px-6`}>
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id || index}
            image={category.image}
            title={category.title}
            imageAlt={category.imageAlt}
            onClick={() => onCategoryClick?.(category, index)}
            index={index}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
}; 
export default CategoriesList;