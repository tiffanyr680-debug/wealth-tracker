import { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const DEFAULT_AFFIRMATIONS = [
    "Money flows to me easily and frequently.",
    "I am a magnet for financial abundance.",
    "My actions create constant prosperity.",
    "I am aligned with the energy of wealth.",
    "Every dollar I spend returns to me multiplied.",
    "I release all resistance to attracting money.",
    "My income grows higher and higher.",
    "I am worthy of an abundant life."
];

export default function AffirmationCard() {
    const [affirmation, setAffirmation] = useState('');
    const [saved, setSaved] = useState(false);
    const [customAffirmations] = useLocalStorage('customAffirmations', []);

    useEffect(() => {
        const pool = [...DEFAULT_AFFIRMATIONS, ...customAffirmations];
        const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        setAffirmation(pool[dayOfYear % pool.length]);
    }, [customAffirmations]);

    const handleSave = () => {
        if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(20);
        }
        setSaved(!saved);
    };

    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 p-6 shadow-lg shadow-black/20">
            {/* Decorative background blur */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl"></div>

            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <SparkleIcon /> Daily Affirmation
            </p>

            <h3 className="text-xl font-medium text-zinc-100 leading-snug mb-6">
                "{affirmation}"
            </h3>

            <div className="flex items-center justify-between">
                <p className="text-xs text-zinc-500">AI Generated</p>
                <button
                    onClick={handleSave}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${saved
                        ? 'bg-rose-gold/20 text-rose-gold border border-rose-gold/30'
                        : 'bg-zinc-800 text-zinc-300 hover:text-zinc-100 border border-zinc-700'
                        }`}
                >
                    <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                    {saved ? 'Saved' : 'Save'}
                </button>
            </div>
        </div>
    );
}

function SparkleIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" className="text-gold-400" />
        </svg>
    );
}
