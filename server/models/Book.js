import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    cover: { type: String },
    pages: { type: Number, min: 1 },
    minutes: { type: Number, min: 1 },
    format: {
      type: String,
      enum: ['print', 'ebook', 'audiobook'],
      default: 'print',
    },
    status: {
      type: String,
      enum: ['want-to-read', 'reading', 'finished'],
      default: 'want-to-read',
    },
    rating: { type: Number, min: 1, max: 5 },
    description: { type: String, trim: true },
    genres: [String],
    tags: [String],
  },
  { timestamps: true },
);

const Book = mongoose.model('Book', bookSchema);

export default Book;
