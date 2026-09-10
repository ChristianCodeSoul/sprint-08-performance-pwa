import heroImage from "../assets/hero.webp";
import { Link } from "react-router-dom";

function Home() {
    return (
        <main className="hero">
            <section className="hero-content">
                <div className="hero-text">
                    <span className="hero-badge">NEXT-GEN E-COMMERCE</span>
                    <h1>
                        Performance
                        <span> Store.</span>
                    </h1>
                    
                    <p>
                        A fast, modern shopping experience engineered for Core web vitals, infinite scrolling, lazy loading, and offline-first usage.
                    </p>
                    
                    <div className="hero-actions">
                        <Link to="/products" className="hero-primary-btn">
                            Explore Products
                        </Link>

                        <Link to="/offline" className="hero-secondary-btn">
                            Explore PWA 
                        </Link>
                    </div>

                    <div className="hero-stats">
                        <div>
                            <strong>⚡</strong>
                            <span>Fast Loading</span>
                        </div>
                        <div>
                            <strong>∞</strong>
                            <span>Infinite Scroll</span>
                        </div>
                        <div>
                            <strong>🔴</strong>
                            <span>Offline Ready</span>
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    
                    <div className="hero-image-card">
                        <img
                        src={heroImage}
                        alt="Performance Store banner"
                        width="800"
                        height="400"
                        fetchPriority="high"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
export default Home;