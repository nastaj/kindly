import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import BookGrid from "../components/BookGrid.jsx";
import ShelfTabs from "../components/ShelfTabs.jsx";
import { BOOKS_URL } from "../api.js";

export default function ShelfPage() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeShelf, setActiveShelf] = useState("all");

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

  function moveBook(bookId, newStatus) {
    axios
      .put(`${BOOKS_URL}/${bookId}`, { status: newStatus })
      .then((response) => {
        setBooks(
          books.map((book) => (book._id === bookId ? response.data : book)),
        );
        setErrorMessage("");
      })
      .catch(() =>
        setErrorMessage("Could not move that book. Please try again."),
      );
  }

  const visibleBooks =
    activeShelf === "all"
      ? books
      : books.filter((book) => book.status === activeShelf);
  const shelfIsEmpty = !isLoading && !errorMessage && books.length === 0;
  const tabIsEmpty = books.length > 0 && visibleBooks.length === 0;

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

      {books.length > 0 && (
        <ShelfTabs activeShelf={activeShelf} onSelect={setActiveShelf} />
      )}
      {tabIsEmpty && (
        <p className="mt-6 text-stone-600">No books on this shelf yet.</p>
      )}
      {visibleBooks.length > 0 && (
        <BookGrid
          books={visibleBooks}
          onRemove={removeBook}
          onMove={moveBook}
        />
      )}
    </section>
  );
}
