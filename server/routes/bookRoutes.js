import express from 'express';
import mongoose from 'mongoose';
import Book from '../models/Book.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    console.error('Could not load books:', error.message);
    res.status(500).json({ message: 'Could not load books' });
  }
});

router.get('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid book id' });
  }

  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error('Could not load book:', error.message);
    res.status(500).json({ message: 'Could not load book' });
  }
});

export default router;
