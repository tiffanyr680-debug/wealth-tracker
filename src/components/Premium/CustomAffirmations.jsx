import { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Settings, Plus, X, List } from 'lucide-react';

export default function CustomAffirmations() {
    const [customAffirmations, setCustomAffirmations] = useLocalStorage('customAffirmations', []);
    const [inputValue, setInputValue] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        setCustomAffirmations([...customAffirmations, inputValue.trim()]);
        setInputValue('');

        if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }
    };

    const handleRemove = (indexToRemove) => {
        setCustomAffirmations(customAffirmations.filter((_, idx) => idx !== indexToRemove));
        if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(20);
        }
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-zinc-800 rounded-xl border border-zinc-700/50">
                    <Settings className="w-5 h-5 text-zinc-400" />
                </div>
                <div>
                    <h3 className="text-zinc-100 font-bold font-serif tracking-wide">Custom Affirmations</h3>
                    <p className="text-xs text-zinc-500">Train your mindset with your own words</p>
                </div>
            </div>

            <form onSubmit={handleAdd} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="E.g. I will save $10,000 this year..."
                    className="flex-1 bg-zinc-950 border border-zinc-700 text-zinc-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                />
                <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="px-4 bg-zinc-800 text-zinc-100 rounded-xl hover:bg-zinc-700 transition-colors disabled:opacity-50 flex items-center justify-center border border-zinc-700"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </form>

            <div className="space-y-2">
                {customAffirmations.length === 0 ? (
                    <div className="text-center py-6 border border-dashed border-zinc-700 rounded-xl flex flex-col items-center justify-center gap-2">
                        <List className="w-6 h-6 text-zinc-600" />
                        <p className="text-sm text-zinc-500">No custom affirmations yet.</p>
                    </div>
                ) : (
                    customAffirmations.map((aff, idx) => (
                        <div key={idx} className="flex items-start justify-between gap-3 p-3 bg-zinc-950 rounded-xl border border-zinc-800/80 group">
                            <p className="text-sm text-zinc-300 leading-relaxed italic border-l-2 border-gold-500/50 pl-3">"{aff}"</p>
                            <button
                                onClick={() => handleRemove(idx)}
                                className="p-1 text-zinc-600 hover:text-red-400 transition-colors rounded-lg hover:bg-zinc-900 shrink-0"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
