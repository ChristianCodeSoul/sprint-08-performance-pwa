import { useRef, useEffect, lazy, Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import OfflineBanner from "./components/OfflineBanner";
import ThemeToggle from "./components/ThemeToggle";

const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Offline = lazy(() => import("./pages/Offline"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));

function App() {
  const detailsRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        detailsRef.current && detailsRef.current.hasAttribute("open") && !detailsRef.current.contains(event.target)
      ) {
        detailsRef.current.removeAttribute("open");
      }
    };
    document.addEventListener("click", handleClickOutside);
  }, []);

  const closeMenu = () => {
    if (detailsRef.current) {
      detailsRef.current.removeAttribute("open");
    }
  };

  return (
    <>
    <OfflineBanner />

    <header className="app-header" >
      <nav className="nav-container">
        <Link to="/" className="nav-logo">
        Performance Store
        </Link>

        <div className="desktop-nav">
          <Link to="/" >Home</Link>
          <Link to="/products" >Products</Link>
          <Link to="/checkout" >Checkout</Link>
          <Link to="/offline">Offline</Link>
          <ThemeToggle/>
        </div>

        <details ref={detailsRef} className="mobile-nav">
          <summary aria-label="Toggle navigation menu">☰</summary>
          <nav>
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/products" onClick={closeMenu}>Products</Link>
            <Link to="/checkout" onClick={closeMenu}>Checkout</Link>
            <Link to="/offline" onClick={closeMenu}>Offline</Link>
          </nav>
        </details>
        </nav>
    </header>

    <Suspense fallback={
      <main className="loading-container" style={{ textAlign: "center", padding: "40px" }}>
        <p>Loading page...</p>
      </main>
    }>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/offline" element={<Offline />} />
      </Routes>
    </Suspense>
    </>
  );
}
export default App;
