const API_URL = "https://dummyjson.com";

export async function fetchProducts(page = 1, limit = 12) {
    const skip = (page - 1) * limit;

    const response = await fetch(
        `${API_URL}/products?limit=${limit}&skip=${skip}`);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return response.json();
}

export async function fetchProductById(id) {
    const response = await fetch (`${API_URL}/products/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch product");
    }
    return response.json();
}


export async function submitOrder(orderData) {

    const response = await fetch(`${API_URL}/carts/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: 1,
            products: orderData.items || [],
        }),
    });
    if (!response.ok) {
        throw new Error("Failed to submit order");
    }
    return response.json();
}