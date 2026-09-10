function Offline() {
    return (
    <main className="offline-page">
        <section className="offline-card" aria-labelledby="offline-title">
            <div className="offline-icon" aria-hidden="true">⚡</div>
            <p className="offline-label">Performance Store</p>
            <h1 id="offline-title">You're offline</h1>
            <p className="offline-description">No internet connection is available right now, but previously cached content may still be available.</p>
            <div className="offline-info">
                <strong>
                    Offline suport is active
                </strong>
                <p>Orders and other changes are stored locally and synchronized automatically when your connection returns.</p>
            </div>
            <button type="button" className="offline-retry" onClick={() => window.location.reload()}>
                Try Again
            </button>
        </section>
    </main>
    );
}
export default Offline;