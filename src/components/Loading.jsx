function Loading({ message = "Loading..." }) {
    return (
        <p className="loading" role="status">
            {message}
        </p>
    );
}
export default Loading;