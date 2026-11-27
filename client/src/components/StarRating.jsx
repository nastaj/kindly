const stars = [1, 2, 3, 4, 5];

export default function StarRating({ rating, onRate }) {
  function starColor(star) {
    return star <= rating ? 'text-amber-500' : 'text-stone-300';
  }

  if (!onRate) {
    return (
      <div role="img" aria-label={`Rated ${rating} out of 5`} className="flex text-base">
        {stars.map((star) => (
          <span key={star} className={starColor(star)}>
            ★
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRate(star)}
          aria-label={`Rate ${star} out of 5`}
          aria-pressed={star === rating}
          className={`cursor-pointer rounded text-3xl leading-none transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-600/50 ${starColor(star)}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
