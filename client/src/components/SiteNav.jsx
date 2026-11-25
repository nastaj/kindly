import { Link, NavLink } from 'react-router';

function linkClasses({ isActive }) {
  const base = 'rounded-md px-3 py-2 text-sm font-medium transition-colors';
  return isActive
    ? `${base} bg-emerald-700 text-white`
    : `${base} text-stone-600 hover:bg-emerald-50 hover:text-emerald-700`;
}

export default function SiteNav() {
  return (
    <nav className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="text-2xl font-bold text-emerald-700">
          Kindly
        </Link>
        <div className="flex gap-2">
          <NavLink to="/" end className={linkClasses}>
            Home
          </NavLink>
          <NavLink to="/shelf" className={linkClasses}>
            Shelf
          </NavLink>
          <NavLink to="/add" className={linkClasses}>
            Add book
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
