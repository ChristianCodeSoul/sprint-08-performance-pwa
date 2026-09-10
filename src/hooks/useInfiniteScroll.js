import { useEffect } from "react";

function useInfiniteScroll ({
    targetRef,
    onLoadMore,
    hasMore,
    loading,
}) {
    useEffect(() => {
        const target = targetRef.current;
        if (!target || !hasMore || loading) {
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];

                if (firstEntry.isIntersecting) {
                    onLoadMore();
                }
            },
            {
                root: null,
                rootMargin: "200px",
                threshold: 0,
            },
        );

        observer.observe(target);

        return () => {
            if (target) {
                observer.unobserve(target);
            }
            observer.disconnect();
        };
    }, [ targetRef, onLoadMore, hasMore, loading ]);
}
export default useInfiniteScroll;