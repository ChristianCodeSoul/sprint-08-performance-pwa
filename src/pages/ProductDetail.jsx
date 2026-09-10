import {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../services/api";
import useCartOperations from "../hooks/useCartOperations";



function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCartOperations();
    const [showCartPopup, setShowCartPopup] = useState(false);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProductById(id)
        .then((data) => {
            setProduct(data);
            setLoading(false);
        })
        .catch(() => {
            setError("Failed to load Product.");
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return (
            <main className="product-detail">
                <p>Loading product...</p>
            </main>
        );
    }

    if(error || !product) {
        return (
            <main className="product-detail">
                <button className="product-detail__back" onClick={() => navigate("/products")}>
                    ← Back to Products
                </button>
                <section className="product-detail__card">
                    <span className="eyebrow">NOT FOUND</span> 
                    <h1>Product Not Found</h1>
                    <p>
                        {error || "The product you are looking for does not exist."}
                    </p>
                    <button onClick={() => navigate("/products")}>Back to Products</button>
                </section>
            </main>
        );
    }
    function handleAddToCart() {
        addToCart(product);
        setShowCartPopup(true);
    };

    return (
        <main className="product-detail">
            <button className="product-detail__back" onClick={() => navigate("/products")}>
                ← Back to Products
            </button>
            <section className="product-detail__card">
                <span className="eyebrow">
                    {product.category}
                </span>
                <div className="product-detail__visual">
                    {product.title.charAt(0)}
                </div>
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <div className="product-detail__price">
                    ${product.price.toLocaleString("en-IN")}
                </div>
                <button onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </section>

            {showCartPopup && (
                <div className="cart-popup-overlay"
                role="dialog"
                aria-modal="true"
                aria-labelledby="cart-popup-title"
                >
                    <div className="cart-popup">
                        <span className="eyebrow">CART UPDATED</span>
                        <h2 id="cart-popup-title">Added to Cart</h2>
                        <p>{product.title} has been added to your cart.</p>
                        
                        <div className="cart-popup__actions">
                            <button type = "button" className="cart-popup__ok" onClick={() => setShowCartPopup(false)}>
                                Ok
                            </button>
                            <button type="button" className="cart-popup__check" onClick={() => navigate("/cart")}>
                                Check Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
export default ProductDetail;