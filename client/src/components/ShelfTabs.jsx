const shelfTabs = [
  { value: 'all', label: 'All' },
  { value: 'want-to-read', label: 'Want to read' },
  { value: 'reading', label: 'Reading' },
  { value: 'finished', label: 'Finished' },
];

export default function ShelfTabs({ activeShelf, onSelect }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {shelfTabs.map((tab) => {
        const isActive = tab.value === activeShelf;

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onSelect(tab.value)}
            aria-pressed={isActive}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600/50 ${
              isActive
                ? 'border-emerald-700 bg-emerald-700 text-white'
                : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-100'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
