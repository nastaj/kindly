import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import BookForm from '../components/BookForm.jsx';
import { BOOKS_URL } from '../api.js';

const emptyBook = {
  title: '',
  author: '',
  cover: '',
  pages: '',
  minutes: '',
  format: 'print',
  status: 'want-to-read',
  rating: '',
};

export default function AddBookPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  function saveBook(book) {
    axios
      .post(BOOKS_URL, book)
      .then(() => navigate('/shelf'))
      .catch(() => setErrorMessage('Could not add the book. Please try again.'));
  }

  return (
    <section>
      <h1 className="text-3xl font-bold text-emerald-700">Add a book</h1>
      <p className="mt-2 text-stone-600">Fill in the details and pick a shelf.</p>
      {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
      <BookForm startingBook={emptyBook} onSave={saveBook} saveLabel="Add book" />
    </section>
  );
}
