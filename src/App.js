import Home from "./routes/Home";
import { Routes, Route } from "react-router-dom";
import NavFooter from "./routes/NavFooter.js";
import SignIn from "./pages/SignIn/SignIn.js";
import CategoryPage from "./pages/CategoryPage/CategoryPage.js";
import SearchPage from "./routes/SearchPage.js";
import Contact from "./routes/Contact.js";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import { Toaster } from "react-hot-toast";

function Cart() {
  return <>Hello</>;
}

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<NavFooter />}>
          <Route index={true} element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="category/:categoryName" element={<CategoryPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                {" "}
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route path="contact-us" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
