import { useLocalStorage } from '../../hooks/useLocalStorage';
import { TrendingUp, CalendarDays } from 'lucide-react';

export default function HistoryView() {
    const [ratingHistory] = useLocalStorage('ratingHistory', []);

    // Sort by date ascending to show left to right chronological
    const sortedHistory = [...ratingHistory].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Get last 30 days
    const last30Days = sortedHistory.slice(-30);

    // We want at least 7 columns to look decent if there's very little data
    const chartData = last30Days.length > 0 ? last30Days : Array.from({ length: 7 }).map((_, i) => ({ date: 'N/A', rating: 0 }));

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-800 rounded-xl border border-zinc-700/50">
                        <TrendingUp className="w-5 h-5 text-zinc-300" />
                    </div>
                    <div>
                        <h3 className="text-zinc-100 font-bold font-serif tracking-wide">30-Day History</h3>
                        <p className="text-xs text-zinc-500">Your wealth mindset trends</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded-full border border-zinc-700">
                    <CalendarDays className="w-3 h-3" />
                    <span>Last {Math.min(30, Math.max(7, chartData.length))} Entries</span>
                </div>
            </div>

            <div className="h-32 flex items-end justify-between gap-1 pt-4 pb-2 border-b border-zinc-800 relative z-10">
                {chartData.map((entry, idx) => {
                    // Height calculation: rating is 1-5, so height is (rating / 5) * 100%
                    const heightPercent = entry.rating > 0 ? `${(entry.rating / 5) * 100}%` : '4px';

                    return (
                        <div key={idx} className="relative flex flex-col items-center flex-1 group h-full justify-end">
                            <div
                                className={`w-full max-w-[12px] rounded-t-sm transition-all duration-500 ${entry.rating > 0 ? 'bg-gold-500 group-hover:bg-gold-400 shadow-[0_0_10px_rgba(212,175,55,0.2)]' : 'bg-zinc-800'}`}
                                style={{ height: heightPercent }}
                            />
                            {/* Tooltip on hover */}
                            {entry.rating > 0 && (
                                <div className="absolute -top-8 bg-zinc-800 text-zinc-100 text-[10px] px-2 py-1 rounded shadow-lg border border-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                                    {entry.rating} Stars
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                <span>Older</span>
                <span>Recent</span>
            </div>
        </div>
    );
}
