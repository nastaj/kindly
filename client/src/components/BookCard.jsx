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

export default function BookCard({ book, onRemove }) {
  const length = lengthText(book);

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
        <p className="mt-auto pt-2 text-xs text-stone-500">
          {formatLabels[book.format]}
          {length && <span> · {length}</span>}
        </p>
        <button
          type="button"
          onClick={confirmRemove}
          className="mt-3 rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-600/50"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
