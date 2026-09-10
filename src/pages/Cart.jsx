
import { useNavigate } from "react-router-dom";
import useCartOperations from "../hooks/useCartOperations";

function Cart() {
    const navigate = useNavigate();
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        getCartItemCount,
    } = useCartOperations();

    const total = getCartTotal();

    if (cartItems.length === 0) {
        return(
            <main className="cart-page">
                <h1>Your Cart</h1>
                <p>Your Cart is empty.</p>
                <button onClick={() => navigate("/products")}>
                    Continue Shopping 
                </button>
            </main>
        );
    }
    return (
        <main className="cart-page">
            <header>
                <h1>Your Cart</h1>
                <p>{getCartItemCount()} item(s) in your cart.</p>
            </header>
            <section className="cart-items">
                {cartItems.map((item) => (
                    <article key={item.id} className="cart-item">
                        <div>
                            <h2>{item.title}</h2>
                            <p>{item.category}</p>
                            <p>₹{item.price.toLocaleString("en-IN")}</p>
                        </div>
                        <div className="cart-item-controls">
                            <button 
                            onClick={() =>
                                updateQuantity(
                                    item.id,
                                    item.quantity - 1
                                )
                            }
                            >
                            -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                            onClick={() =>
                                updateQuantity(
                                    item.id,
                                    item.quantity + 1
                                )
                            }>
                                +
                            </button>
                            <button
                               onClick={() => removeFromCart(item.id)}
                            >
                                Remove
                            </button>
                        </div>
                        <p>
                            Subtotal:  $
                            {(
                                item.price * item.quantity
                            ).toLocaleString("en-IN")}
                        </p>
                    </article>
                ))}
            </section>
            <section className="cart-summary">
                <h2>
                    Total:  ${total.toLocaleString("en-IN")}
                </h2>
                <button onClick={() => navigate("/products")}>
                    Continue Shopping
                </button>
                <button onClick={() => navigate("/checkout")}>
                    Proceed to Checkout
                </button>
            </section>
        </main>
    );
} 
export default Cart;

