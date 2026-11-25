import { BrowserRouter, Routes, Route } from 'react-router';
import SiteNav from './components/SiteNav.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import HomePage from './pages/HomePage.jsx';
import ShelfPage from './pages/ShelfPage.jsx';
import AddBookPage from './pages/AddBookPage.jsx';
import EditBookPage from './pages/EditBookPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-stone-50 text-stone-800">
        <SiteNav />
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shelf" element={<ShelfPage />} />
            <Route path="/add" element={<AddBookPage />} />
            <Route path="/edit/:id" element={<EditBookPage />} />
          </Routes>
        </main>
        <SiteFooter />
      </div>
    </BrowserRouter>
  );
}
