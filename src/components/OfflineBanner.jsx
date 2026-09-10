import { useEffect, useState } from "react";
function OfflineBanner() {
    const [online, setOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => {
            setOnline(true);
        };
        const handleOffline = () => {
            setOnline(false);
        };
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline); 
        };
    }, []);
    if (online) {
        return null;
    }
    return (
        <div className="offline-banner">
            You are offline. Cached content is available.
        </div>
    );
}
export default OfflineBanner;