import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import BookGrid from "../components/BookGrid.jsx";
import { BOOKS_URL } from "../api.js";

export default function ShelfPage() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get(BOOKS_URL)
      .then((response) => setBooks(response.data))
      .catch(() =>
        setErrorMessage("Could not load your books. Please try again."),
      )
      .finally(() => setIsLoading(false));
  }, []);

  function removeBook(bookId) {
    axios
      .delete(`${BOOKS_URL}/${bookId}`)
      .then(() => {
        setBooks(books.filter((book) => book._id !== bookId));
        setErrorMessage("");
      })
      .catch(() =>
        setErrorMessage("Could not delete that book. Please try again."),
      );
  }

  const shelfIsEmpty = !isLoading && !errorMessage && books.length === 0;

  return (
    <section>
      <h1 className="text-3xl font-bold text-emerald-700">My shelf</h1>
      <p className="mt-2 text-stone-600">
        Every book you are tracking, newest first.
      </p>

      {isLoading && (
        <p className="mt-6 text-stone-500">Loading your books...</p>
      )}
      {errorMessage && <p className="mt-6 text-red-600">{errorMessage}</p>}
      {shelfIsEmpty && (
        <p className="mt-6 text-stone-600">
          Your shelf is empty.{" "}
          <Link
            to="/add"
            className="font-medium text-emerald-700 hover:underline"
          >
            Add your first book
          </Link>
        </p>
      )}

      {books.length > 0 && <BookGrid books={books} onRemove={removeBook} />}
    </section>
  );
}
