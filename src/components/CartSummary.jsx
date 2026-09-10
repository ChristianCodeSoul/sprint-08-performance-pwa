import { useNavigate } from "react-router-dom";
import useCartOperations from "../hooks/useCartOperations";

function CartSummary() {
    const navigate = useNavigate();

    const {
        getCartItemCount,
        getCartTotal,
    } = useCartOperations();

    const itemCount = getCartItemCount();
    const total = getCartTotal();

    return (
        <button className="cart-summary"
        onClick={() => navigate("/cart")}
        type="button"
        >
            <span>Cart</span>
            <strong>
                {itemCount}{" "}
                {itemCount === 1 ? "item" : "items"}
            </strong>

            <span>
                ₹{total.toLocaleString("en-IN")}
            </span>
        </button>
    );
}
export default CartSummary;