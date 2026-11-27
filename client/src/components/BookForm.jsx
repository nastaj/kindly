import { useState } from 'react';
import StarRating from './StarRating.jsx';

const labelClasses = 'flex flex-col gap-1 text-sm font-medium text-stone-700';
const fieldClasses =
  'rounded-md border border-stone-300 bg-white px-3 py-2 text-base font-normal text-stone-800 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/30';

export default function BookForm({ startingBook, onSave, saveLabel }) {
  const [book, setBook] = useState(startingBook);

  function updateField(event) {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  }

  function updateRating(star) {
    setBook({ ...book, rating: star === book.rating ? '' : star });
  }

  function submitBook(event) {
    event.preventDefault();
    onSave(book);
  }

  return (
    <form
      onSubmit={submitBook}
      className="mt-6 grid gap-5 rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:grid-cols-2"
    >
      <label className={labelClasses}>
        Title
        <input
          name="title"
          value={book.title}
          onChange={updateField}
          required
          className={fieldClasses}
        />
      </label>

      <label className={labelClasses}>
        Author
        <input
          name="author"
          value={book.author}
          onChange={updateField}
          required
          className={fieldClasses}
        />
      </label>

      <label className={`${labelClasses} sm:col-span-2`}>
        Cover image URL
        <input
          type="url"
          name="cover"
          value={book.cover}
          onChange={updateField}
          placeholder="https://"
          className={fieldClasses}
        />
      </label>

      <label className={labelClasses}>
        Format
        <select
          name="format"
          value={book.format}
          onChange={updateField}
          className={fieldClasses}
        >
          <option value="print">Print</option>
          <option value="ebook">Ebook</option>
          <option value="audiobook">Audiobook</option>
        </select>
      </label>

      {book.format === 'audiobook' ? (
        <label className={labelClasses}>
          Listening time (minutes)
          <input
            type="number"
            min="1"
            name="minutes"
            value={book.minutes}
            onChange={updateField}
            className={fieldClasses}
          />
        </label>
      ) : (
        <label className={labelClasses}>
          Pages
          <input
            type="number"
            min="1"
            name="pages"
            value={book.pages}
            onChange={updateField}
            className={fieldClasses}
          />
        </label>
      )}

      <label className={labelClasses}>
        Shelf
        <select
          name="status"
          value={book.status}
          onChange={updateField}
          className={fieldClasses}
        >
          <option value="want-to-read">Want to read</option>
          <option value="reading">Reading</option>
          <option value="finished">Finished</option>
        </select>
      </label>

      {book.status === 'finished' && (
        <div className={labelClasses}>
          <span>Rating</span>
          <StarRating rating={book.rating} onRate={updateRating} />
          <span className="text-xs font-normal text-stone-500">
            Click a star to rate. Click it again to clear.
          </span>
        </div>
      )}

      <div className="flex justify-end sm:col-span-2">
        <button
          type="submit"
          className="rounded-md bg-emerald-700 px-5 py-2 font-medium text-white transition-colors hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/50"
        >
          {saveLabel}
        </button>
      </div>
    </form>
  );
}
