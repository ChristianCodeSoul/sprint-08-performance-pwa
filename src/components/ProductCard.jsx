import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
    const navigate = useNavigate();

    return (
        <article 
        className="product-card"
        onClick={() => navigate(`/products/${product.id}`)}
        role="link"
        tabIndex="0"
        onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
                navigate(`/products/${product.id}`);
            }
        }}
        >


            <img
            src={product.thumbnail}
            alt={product.title}
            width="300"
            height="300"
            loading="lazy"
            />

            <div className="product-card__content">
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <strong>${product.price.toLocaleString("en-IN")}</strong>
            </div>
        </article>
    );
}
export default ProductCard;