import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./previewModal.scss";

function getBookPrice(book) {
  const amount = book.saleInfo?.retailPrice?.amount;
  const currency = book.saleInfo?.retailPrice?.currencyCode || "EGP";
  return amount ? `${Math.floor(amount)} ${currency}` : `100 EGP`;
}

export default function PreviewModal({ book, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!book) return null;

  const info = book.volumeInfo;

  function getFirstSentence(text) {
    if (!text) return "No description available.";

    const index = text.indexOf(".");
    return index !== -1 ? text.substring(0, index + 1) : text;
  }

  function handleAdd() {
    const price = book.saleInfo?.retailPrice?.amount
      ? Math.floor(book.saleInfo.retailPrice.amount)
      : 100;

    const item = {
      id: book.id,
      title: book.volumeInfo.title,
      image: book.volumeInfo.imageLinks?.thumbnail,
      price: price,
    };
    addToCart(item, quantity);
    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <img
          src={info.imageLinks?.thumbnail}
          alt={info.title}
          className="modal-image"
        />
        <h2 className="buy-card-title">{info.title}</h2>
        <p className="authors">{info.authors?.join(", ")}</p>
        <p className="description">
          {getFirstSentence(info.description) || "No description"}
        </p>

        <p className="price">{getBookPrice(book)}</p>

        <div className="quantity-controls">
          <button
            className="quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="quantity"
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>

        <button className="add-to-cart" onClick={handleAdd}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
