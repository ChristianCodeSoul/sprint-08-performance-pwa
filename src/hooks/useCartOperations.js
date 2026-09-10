import { useCart } from "../context/useCart";

function useCartOperations() {
    const {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
    } = useCart();

    const getCartTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };
    const getCartItemCount = () => {
        return cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );
    };
    return {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        getCartItemCount,
    };
}
export default useCartOperations;