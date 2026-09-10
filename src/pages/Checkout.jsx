import { useState } from "react";
import { submitOrder} from "../services/api";
import { queueOrder } from "../services/offlineQueue";
import { useCart } from "../context/useCart";

function Checkout() {
    const [status, setStatus] = useState("");
    const { cartItems } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);
        setStatus("");

        const order = {
            items: cartItems.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
            })),
        };
        
        try {
            if (!navigator.onLine) {
                await queueOrder(order);

                setStatus( 
                    "You are offline. Your order has been queued and will sync when you reconnect."
                );
                return;
            }
            await submitOrder(order);
            setStatus("Order submitted successfully.");
        } catch {
            await queueOrder(order);

            setStatus(
                "Network request failed. Your order has been queued for synchronization.",
            );
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <main style={{ padding: "24px" , maxWidth: "800px", margin: "0 auto" }}>
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
                <button type="submit" disabled={isSubmitting} style={{ padding: "12px 24px", fontSize: "1rem" , fontWeight: "600", cursor: isSubmitting ? "not-allowed": "pointer" }}>
                    {isSubmitting ? "Processing..." : "Place Demo Order"}
                </button>
            </form>
            {status && (
                <p role="status" style= {{ marginTop: "20px", padding: "12px", borderRadius: "6px", background: "var(--surface, #f3f4f6)", border: "1px solid var(--border, #e5e7eb)" }}>
                    {status}
                </p>
            )}
        </main>
    );
}
export default Checkout;