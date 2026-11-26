import BookCard from "./BookCard.jsx";

export default function BookGrid({ books, onRemove, onMove }) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {books.map((book) => (
        <BookCard
          key={book._id}
          book={book}
          onRemove={onRemove}
          onMove={onMove}
        />
      ))}
    </div>
  );
}
