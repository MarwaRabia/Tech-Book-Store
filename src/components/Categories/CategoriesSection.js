import CategoryItem from "./CategoryItem";
import "./categorySection.scss";
function CategoriesSection({ categories }) {
  return (
    <div className="categories-section">
          <h2 className="section-title">Categories</h2>
      <div className="categories-container">
        {categories.map((category) => (
          <CategoryItem category={category} key={category.id} />
        ))}
      </div>
    </div>
  );
}

export default CategoriesSection;
