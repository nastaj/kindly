import { AnimatePresence, motion } from "motion/react";
import BookCard from "./BookCard.jsx";

export default function BookGrid({ books, onRemove, onMove }) {
  return (
    <div className="relative mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <AnimatePresence mode="popLayout">
        {books.map((book) => (
          <motion.div
            key={book._id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <BookCard book={book} onRemove={onRemove} onMove={onMove} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
