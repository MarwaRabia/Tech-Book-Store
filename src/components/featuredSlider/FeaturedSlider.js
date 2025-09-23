import { useEffect, useState } from "react";
import { fetchBooks } from "../../services/googleBooks.js";
import "./featuredSlider.scss";
import { useCart } from "../../context/CartContext.js";
import PreviewModal from "../../pages/PreviewModal.js";
import { getFromCache, setToCache } from "../../services/cache.js";

function getBookPrice(book) {
  const amount = book.saleInfo?.retailPrice?.amount;
  const currency = book.saleInfo?.retailPrice?.currencyCode || "EGP";
  return amount ? `${Math.floor(amount)} ${currency}` : "100 EGP";
}

function FeaturedSlider({ query, title }) {
  const [books, setBooks] = useState([]);
  const { addToCart } = useCart();
  const [selectedBook, setSelectedBook] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBooks() {
      setLoading(true);

      const cached = getFromCache(query);
      if (cached && Array.isArray(cached) && cached.length > 0) {
        setBooks(cached);
        setLoading(false);

        return;
      }

      const data = await fetchBooks(query);

      
      if (Array.isArray(data) && data.length > 0) {
      setToCache(query, data);
    }


      setBooks(data);
      setLoading(false);
    }

    loadBooks();
  }, [query]);

  function handleAdd(book) {
    const price = book.saleInfo?.retailPrice?.amount
      ? Math.floor(book.saleInfo.retailPrice.amount)
      : 100;

    const item = {
      id: book.id,
      title: book.volumeInfo.title,
      image: book.volumeInfo.imageLinks?.thumbnail,
      price: price,
    };
    addToCart(item, 1);
  }

  return (
    <div className="featured-slider">
      <h2>{title}</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="slider-container">
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

                <h3>{info.title}</h3>
                <p className="price">{getBookPrice(book)}</p>

                <button
                  className="buy-button"
                  onClick={() => setSelectedBook(book)}
                >
                  Buy
                </button>
              </div>
            );
          })}
        </div>
      )}

      {selectedBook && (
        <PreviewModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}

export default FeaturedSlider;
