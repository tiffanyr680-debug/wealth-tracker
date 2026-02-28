import { Sparkles, Settings as SettingsIcon } from 'lucide-react';

export default function Header({ onOpenPro, onOpenSettings, isPro }) {
    return (
        <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
            <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
                <h1 className="font-bold text-lg text-zinc-100 tracking-tight">
                    Wealth<span className="text-gold-500">Mindset</span>
                </h1>

                <div className="flex items-center gap-3">
                    {!isPro && (
                        <button
                            onClick={onOpenPro}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-gold-600 to-gold-400 text-zinc-950 font-semibold text-sm shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-shadow"
                        >
                            <Sparkles className="w-4 h-4" />
                            Unlock Pro
                        </button>
                    )}

                    <button
                        onClick={onOpenSettings}
                        className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
                        aria-label="Settings"
                    >
                        <SettingsIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}
