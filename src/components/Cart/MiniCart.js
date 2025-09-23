import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./cart.scss";
import { toast} from "react-hot-toast";

export default function MiniCart({ onClose }) {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="mini-cart">
      <div className="cart-btn">
        <h4>Cart</h4>

        {cartItems.length !== 0 ? (
          <button
            className="close-btn"
            onClick={() => {
             
              toast.error("your card is cleared")
              clearCart();
            }}
          >
            ✖
          </button>
        ) : (
          ""
        )}
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="mini-list">
            {cartItems.map((it) => (
              <li key={it.id} className="mini-item">
                <img src={it.image} alt={it.title} width={80} height={80} />
                <div className="mini-info">
                  <div className="mini-title">{it.title}</div>
                  <div className="mini-qty">
                    {/* x{it.quantity} • {it.price} EGP */}
                    <p>
                      <span>price:</span> {it.price} EGP
                    </p>
                    <p>
                      <span>quantity:</span> {it.quantity}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mini-footer">
            <div className="mini-total">
              <span>Total:</span> {totalPrice.toFixed(2)} EGP
            </div>
            <button
              onClick={() => {
                onClose();
                navigate("/checkout");
              }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
