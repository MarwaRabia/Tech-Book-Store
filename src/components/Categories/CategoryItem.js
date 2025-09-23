
import { Link } from "react-router-dom";
import "./categoryItem.scss";

function CategoryItem({ category }) {
  return (
    <Link to={`/category/${category.slug}`} className="category-link">
      <div className="category-container">
        <span
          className="category-image"
          style={{ backgroundImage: `url(${category.imgURL})` }}
        ></span>
        <span className="category-title">{category.title}</span>
      </div>
    </Link>
  );
}

export default CategoryItem;
