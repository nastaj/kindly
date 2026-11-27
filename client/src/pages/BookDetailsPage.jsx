import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";
import StarRating from "../components/StarRating.jsx";
import { BOOKS_URL } from "../api.js";
import {
  shelfLabels,
  badgeClasses,
  formatLabels,
  lengthText,
} from "../bookLabels.js";

export default function BookDetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${BOOKS_URL}/${id}`)
      .then((response) => setBook(response.data))
      .catch(() =>
        setErrorMessage("Could not load that book. Please try again."),
      );
  }, [id]);

  const isLoading = !book && !errorMessage;
  const length = book ? lengthText(book) : "";

  return (
    <section>
      <Link
        to="/shelf"
        className="text-sm font-medium text-emerald-700 hover:underline"
      >
        ← Back to shelf
      </Link>

      {isLoading && <p className="mt-6 text-stone-500">Loading the book...</p>}
      {errorMessage && <p className="mt-6 text-red-600">{errorMessage}</p>}

      {book && (
        <article className="mt-6 flex flex-col gap-8 sm:flex-row">
          {book.cover ? (
            <img
              src={book.cover}
              alt={`Cover of ${book.title}`}
              className="aspect-2/3 w-48 shrink-0 self-center rounded-xl object-cover shadow-sm sm:w-56 sm:self-start"
            />
          ) : (
            <div className="flex aspect-2/3 w-48 shrink-0 items-center justify-center self-center rounded-xl bg-emerald-50 p-4 text-center text-xl font-semibold text-emerald-700 sm:w-56 sm:self-start">
              {book.title}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <span
              className={`self-start rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClasses[book.status]}`}
            >
              {shelfLabels[book.status]}
            </span>
            <h1 className="text-3xl font-bold text-stone-800">{book.title}</h1>
            <p className="text-lg text-stone-600">{book.author}</p>
            {book.status === "finished" && book.rating && (
              <StarRating rating={book.rating} />
            )}

            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
              <dt className="text-stone-500">Format</dt>
              <dd>{formatLabels[book.format]}</dd>
              {length && (
                <>
                  <dt className="text-stone-500">Length</dt>
                  <dd>{length}</dd>
                </>
              )}
              <dt className="text-stone-500">Added</dt>
              <dd>{new Date(book.createdAt).toLocaleDateString()}</dd>
            </dl>

            <Link
              to={`/edit/${book._id}`}
              className="mt-6 self-start rounded-md border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-600/50"
            >
              Edit book
            </Link>
          </div>
        </article>
      )}
    </section>
  );
}
