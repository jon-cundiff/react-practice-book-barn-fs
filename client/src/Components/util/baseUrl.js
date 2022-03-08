const baseUrl =
    process.env.NODE_ENV === "production"
        ? "https://jc-book-barn.herokuapp.com"
        : "http://localhost:8080";

export default baseUrl;
