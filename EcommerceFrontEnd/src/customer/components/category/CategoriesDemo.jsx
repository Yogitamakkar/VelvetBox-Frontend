import CategoriesList from "./CategoryList";

export default function CategoriesDemo() {
  const categories = [
    { id: 1, title: "Birthday Flowers", image: "https://cdn.igp.com/f_auto,q_auto,t_pnopt4prodlp/banners/birthday_flowers_d_polaroid_5_1745390547022" },
    { id: 2, title: "Anniversary Gifts", image: null },
    { id: 3, title: "Food Hampers", image: null },
    { id: 4, title: "Summer Special", image: null },
    { id: 5, title: "Trending Gifts", image: null },
    { id: 6, title: "Gifts for Kids", image: null },
  ];

  const handleCategoryClick = (category, index) => {
    console.log('Category clicked:', category, 'at index:', index);
    // Add your click handler logic here
  };

  return (
    <div className="m-4">
        <CategoriesList 
        categories={categories}
          onCategoryClick={handleCategoryClick}
          cols={6}
          gap={6}
          className="mb-12"
        />
    </div>
  );
} 