export const shelfLabels = {
  'want-to-read': 'Want to read',
  reading: 'Reading',
  finished: 'Finished',
};

export const badgeClasses = {
  'want-to-read': 'bg-sky-100 text-sky-800',
  reading: 'bg-amber-100 text-amber-800',
  finished: 'bg-emerald-100 text-emerald-800',
};

export const formatLabels = {
  print: 'Print',
  ebook: 'Ebook',
  audiobook: 'Audiobook',
};

export function lengthText(book) {
  if (book.format === 'audiobook') {
    return book.minutes ? `${book.minutes} min` : '';
  }
  return book.pages ? `${book.pages} pages` : '';
}
