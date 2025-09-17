function CategoryItem({ category }) {
  return (
    <div className="category-container">
      <span
        className="category-image"
        style={{ backgroundImage: category.imageUrl }}
      ></span>
      <span className="category-title">{category.title}</span>
    </div>
  );
}

export default CategoryItem;
