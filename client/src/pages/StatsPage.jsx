import { useEffect, useState } from 'react';
import axios from 'axios';
import StatCard from '../components/StatCard.jsx';
import { BOOKS_URL } from '../api.js';

function countOnShelf(books, status) {
  return books.filter((book) => book.status === status).length;
}

function totalOf(books, field) {
  return books.reduce((total, book) => total + (book[field] || 0), 0);
}

function averageRating(books) {
  const ratedBooks = books.filter((book) => book.rating);
  if (ratedBooks.length === 0) {
    return 'None yet';
  }
  const average = totalOf(ratedBooks, 'rating') / ratedBooks.length;
  return `${average.toFixed(1)} / 5`;
}

export default function StatsPage() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios
      .get(BOOKS_URL)
      .then((response) => setBooks(response.data))
      .catch(() => setErrorMessage('Could not load your stats. Please try again.'))
      .finally(() => setIsLoading(false));
  }, []);

  const finishedBooks = books.filter((book) => book.status === 'finished');
  const finishedAudiobooks = finishedBooks.filter((book) => book.format === 'audiobook');
  const finishedReads = finishedBooks.filter((book) => book.format !== 'audiobook');
  const statsAreReady = !isLoading && !errorMessage;

  return (
    <section>
      <h1 className="text-3xl font-bold text-emerald-700">Reading stats</h1>
      <p className="mt-2 text-stone-600">A quick look at your shelves.</p>

      {isLoading && <p className="mt-6 text-stone-500">Loading your stats...</p>}
      {errorMessage && <p className="mt-6 text-red-600">{errorMessage}</p>}

      {statsAreReady && (
        <>
          <h2 className="mt-8 text-lg font-semibold text-stone-700">Shelves</h2>
          <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard label="All books" value={books.length} />
            <StatCard label="Want to read" value={countOnShelf(books, 'want-to-read')} />
            <StatCard label="Reading" value={countOnShelf(books, 'reading')} />
            <StatCard label="Finished" value={finishedBooks.length} />
          </div>

          <h2 className="mt-8 text-lg font-semibold text-stone-700">Finished books</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            <StatCard label="Pages read" value={totalOf(finishedReads, 'pages').toLocaleString()} />
            <StatCard
              label="Minutes listened"
              value={totalOf(finishedAudiobooks, 'minutes').toLocaleString()}
            />
            <StatCard label="Average rating" value={averageRating(finishedBooks)} />
          </div>
        </>
      )}
    </section>
  );
}
