import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Brain, Sparkles, TrendingUp, AlertCircle } from 'lucide-react';

export default function MindsetInsights() {
    const [ratingHistory] = useLocalStorage('ratingHistory', []);

    // Sort by date descending
    const sortedHistory = [...ratingHistory].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Get last 7 days
    const recentHistory = sortedHistory.slice(0, 7);

    if (recentHistory.length === 0) {
        return (
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-rose-gold/10 rounded-xl">
                        <Brain className="w-5 h-5 text-rose-gold" />
                    </div>
                    <h3 className="text-zinc-100 font-bold font-serif tracking-wide">AI Mindset Insights</h3>
                </div>
                <p className="text-zinc-400 text-sm">Check in today to start receiving personalized mindset insights.</p>
            </div>
        );
    }

    const averageRating = recentHistory.reduce((acc, curr) => acc + curr.rating, 0) / recentHistory.length;

    let insightTitle = "";
    let insightDescription = "";
    let Icon = Sparkles;
    let iconColor = "text-gold-400";
    let bgPulse = "bg-gold-500/10";

    if (averageRating < 3) {
        insightTitle = "Building Momentum";
        insightDescription = "You're experiencing some friction. Focus on small, achievable wins to build momentum. Remember that awareness is the first step to rewiring your mindset.";
        Icon = AlertCircle;
        iconColor = "text-rose-gold";
        bgPulse = "bg-rose-gold/10";
    } else if (averageRating < 4.2) {
        insightTitle = "Steady Growth";
        insightDescription = "You're making steady progress. Your mindset is stabilizing. Remember to celebrate the small steps you're taking toward your goals today.";
        Icon = TrendingUp;
        iconColor = "text-blue-400";
        bgPulse = "bg-blue-400/10";
    } else {
        insightTitle = "Abundance Aligned";
        insightDescription = "Your mindset is heavily aligned with abundance! Keep visualizing your success and taking bold, inspired actions. You are a magnet for wealth.";
        Icon = Sparkles;
        iconColor = "text-gold-400";
        bgPulse = "bg-gold-500/10";
    }

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden group">
            {/* Background glow based on insight */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 transition-colors duration-1000 ${bgPulse}`}></div>

            <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="p-2 bg-zinc-800 rounded-xl border border-zinc-700/50">
                    <Brain className="w-5 h-5 text-rose-gold" />
                </div>
                <div>
                    <h3 className="text-zinc-100 font-bold font-serif tracking-wide">AI Mindset Insights</h3>
                    <p className="text-xs text-zinc-500">Based on your last {recentHistory.length} check-ins</p>
                </div>
            </div>

            <div className="bg-zinc-950 rounded-2xl p-5 border border-zinc-800/80 relative z-10 shadow-inner">
                <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                        <Icon className={`w-5 h-5 ${iconColor}`} />
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-zinc-200 mb-1">{insightTitle}</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            {insightDescription}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
