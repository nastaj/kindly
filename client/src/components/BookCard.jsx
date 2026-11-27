import { Link } from "react-router";
import StarRating from "./StarRating.jsx";

const shelfLabels = {
  "want-to-read": "Want to read",
  reading: "Reading",
  finished: "Finished",
};

const badgeClasses = {
  "want-to-read": "bg-sky-100 text-sky-800",
  reading: "bg-amber-100 text-amber-800",
  finished: "bg-emerald-100 text-emerald-800",
};

const nextShelf = {
  "want-to-read": { status: "reading", label: "Start reading" },
  reading: { status: "finished", label: "Mark as finished" },
};

const formatLabels = {
  print: "Print",
  ebook: "Ebook",
  audiobook: "Audiobook",
};

function lengthText(book) {
  if (book.format === "audiobook") {
    return book.minutes ? `${book.minutes} min` : "";
  }
  return book.pages ? `${book.pages} pages` : "";
}

export default function BookCard({ book, onRemove, onMove }) {
  const length = lengthText(book);
  const nextMove = nextShelf[book.status];

  function confirmRemove() {
    if (window.confirm(`Remove "${book.title}" from your shelf?`)) {
      onRemove(book._id);
    }
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
      {book.cover ? (
        <img
          src={book.cover}
          alt={`Cover of ${book.title}`}
          className="aspect-2/3 w-full object-cover"
        />
      ) : (
        <div className="flex aspect-2/3 items-center justify-center bg-emerald-50 p-4 text-center text-lg font-semibold text-emerald-700">
          {book.title}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-1 p-4">
        <span
          className={`mb-1 self-start rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClasses[book.status]}`}
        >
          {shelfLabels[book.status]}
        </span>
        <h2 className="font-semibold leading-snug text-stone-800">
          {book.title}
        </h2>
        <p className="text-sm text-stone-600">{book.author}</p>
        {book.status === "finished" && book.rating && (
          <StarRating rating={book.rating} />
        )}
        <p className="mt-auto pt-2 text-xs text-stone-500">
          {formatLabels[book.format]}
          {length && <span> · {length}</span>}
        </p>
        <div className="mt-3 flex flex-col gap-2">
          {nextMove && (
            <button
              type="button"
              onClick={() => onMove(book._id, nextMove.status)}
              className="rounded-md bg-emerald-700 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/50"
            >
              {nextMove.label}
            </button>
          )}
          <div className="flex gap-2">
            <Link
              to={`/edit/${book._id}`}
              className="flex-1 rounded-md border border-stone-300 px-3 py-1.5 text-center text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/50"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={confirmRemove}
              className="flex-1 rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-600/50"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
