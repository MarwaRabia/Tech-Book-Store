import CategoryItem from "./CategoryItem";
function CategoriesSection({ categories }) {
  return (
    <div categories-container>
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </div>
  );
}

export default CategoriesSection;
