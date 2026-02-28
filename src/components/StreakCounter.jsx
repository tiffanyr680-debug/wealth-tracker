import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Flame } from 'lucide-react';

export default function StreakCounter() {
    const [lastCheckIn, setLastCheckIn] = useLocalStorage('lastCheckIn', null);
    const [streak, setStreak] = useLocalStorage('streak', 0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        // Check if missed a day
        if (lastCheckIn && lastCheckIn !== today && lastCheckIn !== yesterday) {
            setStreak(0);
        }

        // Auto-check for today (simplified - ideally triggered by an action, but we'll just check today)
        // Actually streak shouldn't auto increment, we'll increment when they do DailyCheckIn
        // We'll expose this via a context or let DailyCheckIn handle it.
    }, [lastCheckIn, setStreak]);

    return (
        <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl bg-zinc-800 flex items-center justify-center ${streak > 0 ? 'text-orange-500' : 'text-zinc-500'}`}>
                    <Flame className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm text-zinc-400 font-medium">Current Streak</p>
                    <p className="text-xl font-bold flex items-baseline gap-1">
                        {streak} <span className="text-sm font-normal text-zinc-500">days</span>
                    </p>
                </div>
            </div>

            {streak > 0 && (
                <div className="px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold">
                    On Fire!
                </div>
            )}
        </div>
    );
}
