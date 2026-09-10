import { useState } from "react";
import { CartContext } from "./CartContext";


export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((currentItems) => {
            const existingItems = currentItems.find(
                (item) => item.id === product.id
            );

            if (existingItems) {
                return currentItems.map((item) => 
                    item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
            }
            return [
                ...currentItems,
                {
                    ...product,
                    quantity: 1,
                },
            ];
        });
    };
    const removeFromCart = (productId) => {
        setCartItems((currentItems) => 
            currentItems.filter((item) => item.id !== productId)
        );
    };
    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems((currentItems) => 
            currentItems.map((item) =>
                item.id === productId
                ? { ...item, quantity }
                : item
            )
        );
    };
    return (
        <CartContext.Provider
        value={{
            cartItems, 
            addToCart,
            removeFromCart,
            updateQuantity,
        }}
        >
            {children}
        </CartContext.Provider>
    );
}
