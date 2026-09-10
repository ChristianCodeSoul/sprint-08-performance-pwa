import { useCallback, useEffect, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { fetchProducts } from "../services/api"; 

const PAGE_SIZE = 12;

function Products() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const sentinelRef = useRef(null);
    const loadingRef = useRef(false);

    const loadMoreProducts = useCallback(async () => {
        if (loadingRef.current || !hasMore) return;

        loadingRef.current = true;
        setLoading(true);

        try {
            const data = await fetchProducts( page, PAGE_SIZE );
            setProducts((current) => [...current, ...data.products]);

            const totalFetched = page * PAGE_SIZE;
            setHasMore(totalFetched < data.total);
            setPage((prevPage) => prevPage + 1);

        } catch (requestError) {
          setError(requestError.message || "Failed to load products.");
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    }, [page, hasMore]);

    useEffect(() => {
        const loadInitialProducts = async () => {
        if (loadingRef.current) return;

        loadingRef.current = true;
        setLoading(true);

        try {
            const data = await fetchProducts( 1, PAGE_SIZE );
            setProducts(data.products);

            const totalFetched = PAGE_SIZE;
            setHasMore(totalFetched < data.total);
            setPage(2);

        } catch (requestError) {
          setError(requestError.message || "Failed to load products.");
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    };
    loadInitialProducts();
},[]);


    

    useInfiniteScroll({
        targetRef: sentinelRef,
        onLoadMore: loadMoreProducts,
        hasMore,
        loading,
    });
    return (
        <main className="products-page" style={{padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
            <h1>Products</h1>

            {error && (
                <p role="alert" className="error-message" style={{ color: "#ef4444", padding: "12px 0" }}>
                    {error}
                </p>
            )}

            <section className="product-list">
                {products.map((product) => (
                    <ProductCard
                    key={product.id}
                    product={product}
                    />
                ))}
            </section>

            {loading && <Loading message="Loading more products..."/>}

                {!hasMore && products.length > 0 && (
                <p className="end-message" style={{ textAlign: "center", margin: "32px 0", color: "var(--text-secondary)" }}>
                    You've reached the end.
                </p>
            )}
            
            
            <div ref={sentinelRef} className="scroll-sentinel" aria-hidden="true" style={{ height: "20px", margin: "10px 0" }}/> 
        </main>
    );
}
export default Products;