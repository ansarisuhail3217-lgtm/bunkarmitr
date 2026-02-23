import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
  readOnly?: boolean;
}

export default function StarRating({ value, onChange, size = 20, readOnly = false }: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          className={`transition-transform ${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-125'}`}
        >
          <Star
            size={size}
            className={star <= value ? 'fill-accent text-accent' : 'text-muted-foreground/30'}
          />
        </button>
      ))}
    </div>
  );
}
