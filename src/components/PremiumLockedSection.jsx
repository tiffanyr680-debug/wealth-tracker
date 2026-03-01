import { Lock, TrendingUp, Download, Settings, Brain, CheckCircle2, Info } from 'lucide-react';
import { useState } from 'react';

export default function PremiumLockedSection({ onOpenPro, isPro }) {
    const [showToast, setShowToast] = useState(false);

    const premiumFeatures = [
        {
            icon: <Brain className="w-5 h-5 text-rose-gold" />,
            title: "AI Mindset Insights",
            description: "Based on your mood, here's why you're stuck."
        },
        {
            icon: <TrendingUp className="w-5 h-5 text-zinc-300" />,
            title: "30-Day History View",
            description: "Analyze your wealth building trends."
        },
        {
            icon: <Download className="w-5 h-5 text-blue-400" />,
            title: "Export Monthly Report",
            description: "Download a beautiful PDF mindset report."
        },
        {
            icon: <Settings className="w-5 h-5 text-zinc-400" />,
            title: "Custom Affirmations",
            description: "Input your own goals for the AI to use."
        }
    ];

    const handleFeatureClick = () => {
        setShowToast(true);
        if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }
        setTimeout(() => setShowToast(false), 2500);
    };

    if (isPro) {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold text-zinc-100 font-serif tracking-wide pt-2">Premium Features</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/20 uppercase tracking-widest flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                </div>

                <div className="grid gap-3">
                    {premiumFeatures.map((feature, idx) => (
                        <div
                            key={idx}
                            onClick={handleFeatureClick}
                            className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 transition-colors cursor-pointer hover:bg-zinc-800 group"
                        >
                            <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-zinc-700 transition-colors">
                                {feature.icon}
                            </div>
                            <div>
                                <h4 className="text-zinc-200 text-sm font-semibold mb-1">
                                    {feature.title}
                                </h4>
                                <p className="text-xs text-zinc-500">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Coming Soon Toast */}
                {showToast && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-zinc-800 text-zinc-100 px-4 py-3 rounded-xl shadow-xl border border-zinc-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 z-50">
                        <Info className="w-5 h-5 text-gold-400" />
                        <span className="text-sm font-medium">Feature coming in the next update!</span>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-zinc-100 font-serif tracking-wide pt-2">Premium Features</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gold-500/10 text-gold-500 border border-gold-500/20 uppercase tracking-widest">
                    Pro
                </span>
            </div>

            <div className="grid gap-3 opacity-90 relative">
                {premiumFeatures.map((feature, idx) => (
                    <div
                        key={idx}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 relative overflow-hidden group hover:border-zinc-700 transition-colors cursor-pointer"
                        onClick={onOpenPro}
                    >
                        <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-zinc-700 transition-colors">
                            {feature.icon}
                        </div>
                        <div>
                            <h4 className="text-zinc-200 text-sm font-semibold mb-1 flex items-center gap-2">
                                {feature.title}
                                <Lock className="w-3 h-3 text-zinc-600" />
                            </h4>
                            <p className="text-xs text-zinc-500">{feature.description}</p>
                        </div>
                    </div>
                ))}

                {/* Overlay fade effect to encourage upgrade */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
            </div>

            <button
                onClick={onOpenPro}
                className="w-full mt-2 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-gold-500 font-semibold text-sm hover:bg-zinc-800 transition-colors shadow-sm"
            >
                View Upgrade Options
            </button>
        </div>
    );
}
