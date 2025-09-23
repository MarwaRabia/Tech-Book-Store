import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBooks } from "../../services/googleBooks.js";
import { categories } from "../../routes/Home.js";
import "./categoryPage.scss";
import { useCart } from "../../context/CartContext.js";
import PreviewModal from "../PreviewModal.js";
import { getFromCache, setToCache } from "../../services/cache.js";
import toast from "react-hot-toast";

function getBookPrice(book) {
  const amount = book.saleInfo?.retailPrice?.amount;
  const currency = book.saleInfo?.retailPrice?.currencyCode || "EGP";
  return amount ? `${Math.floor(amount)} ${currency}` : `100 EGP`;
}

function CategoryPage({ searchQuery }) {
  const { categoryName } = useParams();
  const [books, setBooks] = useState([]);
  const { addToCart } = useCart();
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentCategory = categories.find((c) => c.slug === categoryName);

  function handleAdd(book) {
    const price = book.saleInfo?.retailPrice?.amount
      ? Math.floor(book.saleInfo.retailPrice.amount)
      : 100;

    const item = {
      id: book.id,
      title: book.volumeInfo.title,
      image:
        book.volumeInfo.imageLinks?.thumbnail ||
        "https://cdn.iconscout.com/icon/premium/png-512-thumb/programming-icon-svg-download-png-2473012.png?f=webp&w=512",

      price: price,
    };
    toast.success("Added to cart!", {
      position: "bottom-center",
    });
    addToCart(item, 1);
  }

  useEffect(() => {
    if (!currentCategory && !searchQuery) return;

    async function loadBooks() {
      const cacheKey = currentCategory?.query || searchQuery;
      const cachedData = getFromCache(cacheKey);
      if (cachedData && Array.isArray(cachedData) && cachedData.length > 0) {
        setBooks(cachedData);
        setLoading(false);
        return;
      }
      const data = await fetchBooks(cacheKey);

      if (Array.isArray(data) && data.length > 0) {
        setToCache(cacheKey, data);
      }

      setBooks(data);
      setLoading(false);
    }
    loadBooks();
  }, [currentCategory, searchQuery]);

  if (!currentCategory && !searchQuery) return <h1>Category not found</h1>;

  return (
    <div className="books-page">
      <h1 className="page-title">
        {currentCategory?.title || searchQuery} Books
      </h1>
      <div className="books-grid">
        {books.map((book) => {
          const info = book.volumeInfo;

          return (
            <div key={book.id} className="book-card">
              <div className="image-container">
                <img
                  src={
                    info.imageLinks?.thumbnail ||
                    "https://cdn.iconscout.com/icon/premium/png-512-thumb/programming-icon-svg-download-png-2473012.png?f=webp&w=512"
                  }
                  alt={info.title}
                />
                <button className="quick-add" onClick={() => handleAdd(book)}>
                  Add to Cart
                </button>
              </div>

              {/* <img
                src={info.imageLinks?.thumbnail}
                alt={info.title}
                className="book-image"
              /> */}

              <div className="book-details">
                <h3 className="book-title">{info.title}</h3>
                <p className="book-authors">{info.authors?.join(", ")}</p>
                <p className="book-description">
                  {info.description
                    ? info.description.substring(0, 100) + "..."
                    : "No description available."}
                </p>
                <div className="book-footer">
                  <span className="book-price">{getBookPrice(book)}</span>

                  <button
                    className="buy-button"
                    onClick={() => setSelectedBook(book)}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedBook && (
        <PreviewModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}

export default CategoryPage;
