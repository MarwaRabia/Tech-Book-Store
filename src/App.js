import Home from "./routes/Home";
import { Routes, Route } from "react-router-dom";
import NavFooter from './routes/NavFooter.js';

function Cart() {
  return <h1>your are in cart page</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavFooter />}>
        <Route index={true} element={<Home />} />
        {/* <Route path="home" element={<Home />} /> */}
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
