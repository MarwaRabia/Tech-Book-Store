import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../services/firebase.js";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { useUser } from "./UserContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useUser();

  const [cartItems, setCartItems] = useState(() => {
    const raw = localStorage.getItem("cart_items");
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    const loadCart = async () => {
      if (!user) {
        const raw = localStorage.getItem("cart_items");
        setCartItems(raw ? JSON.parse(raw) : []);
        return;
      }

      const cartRef = doc(db, "carts", user.uid);

      const docSnap = await getDoc(cartRef);
      const firebaseCart = docSnap.exists() ? docSnap.data().items || [] : [];

      const raw = localStorage.getItem("cart_items");
      const localCart = raw ? JSON.parse(raw) : [];

      let mergedCart = [...firebaseCart];

      if (localCart.length > 0) {
        localCart.forEach((item) => {
          const existing = mergedCart.find((p) => p.id === item.id);
          if (existing) {
            existing.quantity += item.quantity;
          } else {
            mergedCart.push(item);
          }
        });
        localStorage.removeItem("cart_items");

        await setDoc(cartRef, { items: mergedCart });
      }

      setCartItems(mergedCart);

      const unsubscribe = onSnapshot(cartRef, (snap) => {
        if (snap.exists()) {
          setCartItems(snap.data().items || []);
        }
      });

      return unsubscribe;
    };

    loadCart();
  }, [user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart_items", JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  // Cart functions
  function addToCart(product, quantity = 1) {
    if (user) {
      const cartRef = doc(db, "carts", user.uid);
      getDoc(cartRef).then((docSnap) => {
        const firebaseCart = docSnap.exists() ? docSnap.data().items || [] : [];
        const existing = firebaseCart.find((p) => p.id === product.id);

        if (existing) {
          existing.quantity += quantity;
        } else {
          firebaseCart.push({ ...product, quantity });
        }
        setDoc(cartRef, { items: firebaseCart });
      });
    } else {
      setCartItems((prev) => {
        const existing = prev.find((p) => p.id === product.id);
        if (existing) {
          return prev.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
          );
        }
        return [...prev, { ...product, quantity }];
      });
    }
  }

  function updateItemQuantity(productId, newQty) {
    if (user) {
      const cartRef = doc(db, "carts", user.uid);
      getDoc(cartRef).then((docSnap) => {
        const firebaseCart = docSnap.exists() ? docSnap.data().items || [] : [];
        const updatedCart = firebaseCart
          .map((p) =>
            p.id === productId ? { ...p, quantity: Math.max(1, newQty) } : p
          )
          .filter((p) => p.quantity > 0);
        setDoc(cartRef, { items: updatedCart });
      });
    } else {
      setCartItems((prev) =>
        prev
          .map((p) =>
            p.id === productId ? { ...p, quantity: Math.max(1, newQty) } : p
          )
          .filter((p) => p.quantity > 0)
      );
    }
  }

  function increaseQuantity(productId) {
    const qty = getQty(productId) || 0;
    updateItemQuantity(productId, qty + 1);
  }

  function decreaseQuantity(productId) {
    const qty = getQty(productId) || 1;
    updateItemQuantity(productId, qty - 1);
  }

  function removeItem(productId) {
    if (user) {
      const cartRef = doc(db, "carts", user.uid);
      getDoc(cartRef).then((docSnap) => {
        const firebaseCart = docSnap.exists() ? docSnap.data().items || [] : [];
        const updatedCart = firebaseCart.filter((p) => p.id !== productId);
        setDoc(cartRef, { items: updatedCart });
      });
    } else {
      setCartItems((prev) => prev.filter((p) => p.id !== productId));
    }
  }

  function clearCart() {
    if (user) {
      const cartRef = doc(db, "carts", user.uid);
      setDoc(cartRef, { items: [] });
    } else {
      setCartItems([]);
    }
  }

  function getQty(productId) {
    const item = cartItems.find((p) => p.id === productId);
    return item ? item.quantity : 0;
  }

  const totalItems = cartItems.reduce((acc, it) => acc + it.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, it) => acc + it.quantity * Number(it.price),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeItem,
        updateItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
        getQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
