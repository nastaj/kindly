export default function SearchBar({ searchText, onSearchChange }) {
  return (
    <input
      type="search"
      value={searchText}
      onChange={(event) => onSearchChange(event.target.value)}
      placeholder="Search by title or author"
      aria-label="Search by title or author"
      className="mt-4 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-base text-stone-800 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 sm:max-w-sm"
    />
  );
}
