import baseUrl from "./baseUrl";

const fetchBook = async (bookId) => {
    const bookResp = await fetch(`${baseUrl}/book/${bookId}`);
    if (bookResp.status === 200) {
        const book = await bookResp.json();
        return book.book;
    } else {
        throw new Error("Failed to fetch book");
    }
};

export default fetchBook;
