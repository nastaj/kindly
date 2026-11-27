import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import BookForm from '../components/BookForm.jsx';
import { BOOKS_URL } from '../api.js';

function toFormValues(book) {
  return {
    title: book.title,
    author: book.author,
    cover: book.cover || '',
    pages: book.pages || '',
    minutes: book.minutes || '',
    format: book.format,
    status: book.status,
    rating: book.rating || '',
  };
}

export default function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [startingBook, setStartingBook] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios
      .get(`${BOOKS_URL}/${id}`)
      .then((response) => setStartingBook(toFormValues(response.data)))
      .catch(() => setErrorMessage('Could not load that book. Please try again.'));
  }, [id]);

  function saveChanges(book) {
    axios
      .put(`${BOOKS_URL}/${id}`, book)
      .then(() => navigate('/shelf'))
      .catch(() => setErrorMessage('Could not save your changes. Please try again.'));
  }

  const isLoading = !startingBook && !errorMessage;

  return (
    <section>
      <h1 className="text-3xl font-bold text-emerald-700">Edit book</h1>
      <p className="mt-2 text-stone-600">Change the details or move it to another shelf.</p>
      {isLoading && <p className="mt-4 text-stone-500">Loading the book...</p>}
      {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
      {startingBook && (
        <BookForm startingBook={startingBook} onSave={saveChanges} saveLabel="Save changes" />
      )}
    </section>
  );
}
