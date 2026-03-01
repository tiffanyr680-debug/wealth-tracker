import { useState } from 'react';
import { Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function DailyCheckIn() {
    const [hovered, setHovered] = useState(0);
    const [lastCheckIn, setLastCheckIn] = useLocalStorage('lastCheckIn', null);
    const [streak, setStreak] = useLocalStorage('streak', 0);
    const [ratingHistory, setRatingHistory] = useLocalStorage('ratingHistory', []);

    const today = new Date().toISOString().split('T')[0];
    const hasCheckedInToday = lastCheckIn === today;

    // Find today's rating if it exists
    const todaysRatingEntry = ratingHistory.find(entry => entry.date === today);
    const currentRating = todaysRatingEntry ? todaysRatingEntry.rating : 0;

    const [rating, setRating] = useState(currentRating);

    const handleRate = (value) => {
        if (hasCheckedInToday) return;

        // Haptic feedback
        if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }

        setRating(value);
        setLastCheckIn(today);
        setStreak(streak + 1);

        // Save to history
        const newHistory = [...ratingHistory.filter(entry => entry.date !== today), { date: today, rating: value }];
        setRatingHistory(newHistory);

        // Celebration
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#FDE047', '#B76E79']
        });
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-center transform transition-all">
            <h2 className="text-lg font-semibold text-zinc-100 mb-2">Rate your money mindset today</h2>
            <p className="text-sm text-zinc-400 mb-6">Honesty is the most profitable asset.</p>

            <div className="flex justify-center gap-2 mb-2" role="radiogroup" aria-label="Money mindset rating">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => handleRate(star)}
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        disabled={hasCheckedInToday}
                        className="p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-full transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label={`Rate ${star} stars`}
                        role="radio"
                        aria-checked={rating >= star}
                    >
                        <Star
                            className={`w-10 h-10 transition-colors duration-200 ${(hovered || rating) >= star
                                ? 'fill-gold-400 text-gold-400'
                                : 'fill-transparent text-zinc-600'
                                }`}
                        />
                    </button>
                ))}
            </div>

            {hasCheckedInToday && (
                <p className="text-gold-400 text-sm font-medium animate-in fade-in slide-in-from-bottom-2 mt-4">
                    Great job! See you tomorrow.
                </p>
            )}
        </div>
    );
}
