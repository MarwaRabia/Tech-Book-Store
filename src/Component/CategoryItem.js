import "./categoryItem.scss";
function CategoryItem({ category }) {
  return (
    <div className="category-container">
      <span
        className="category-image"
        style={{ backgroundImage: `url(${category.imgURL})` }}
      ></span>
      <span className="category-title">{category.title}</span>
    </div>
  );
}

export default CategoryItem;
