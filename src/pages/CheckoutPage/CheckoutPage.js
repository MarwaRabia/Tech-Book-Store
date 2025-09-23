import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import "./checkout.scss";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    totalPrice,
    clearCart,
    updateItemQuantity,
  } = useCart();
  const navigate=useNavigate()

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkout-page">
        <h1>Checkout</h1>
        <div className="checkout-list">
          {cartItems.map((it) => (
            <div key={it.id} className="checkout-row">
              <img src={it.image} alt={it.title} width={80} height={100} />
              <div className="checkout-info">
                <h3>{it.title}</h3>
                <div className="qty-control">
                  <button onClick={() => decreaseQuantity(it.id)}>-</button>
                  <input
                    type="number"
                    value={it.quantity}
                    min={1}
                    onChange={(e) =>
                      updateItemQuantity(it.id, Number(e.target.value))
                    }
                  />
                  <button onClick={() => increaseQuantity(it.id)}>+</button>
                </div>
                <div className="item-price">
                  {it.quantity} x {it.price} EGP ={" "}
                  {(it.quantity * it.price).toFixed(2)} EGP
                </div>
              </div>
              <button className="remove-btn" onClick={() => removeItem(it.id)}>
                x
              </button>
            </div>
          ))}
        </div>

        <div className="checkout-summary">
          <h3>
            Total: <span>{totalPrice.toFixed(2)}</span> EGP
          </h3>
          <button
            onClick={() => {
         
              toast.success("Proceed to payment (simulate)")
              clearCart();
              navigate('/')
              
            }}
          >
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  );
}
