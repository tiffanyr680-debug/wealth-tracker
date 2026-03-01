import { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { PenLine, CheckCircle2 } from 'lucide-react';

const JOURNAL_PROMPTS = [
    "What is a limiting belief about money you want to let go of today?",
    "What is one financial win you had this week (no matter how small)?",
    "Describe what true wealth feels like to you, not just in numbers.",
    "If money were no object, how would you spend your time today?",
    "What is a new skill you could learn that increases your earning value?",
    "Who is someone you admire financially, and what habit can you copy from them?",
    "What is one expense that no longer brings you joy?",
    "What does your ideal bank account balance feel like to look at?",
    "How can you add more value to others today?",
    "Write down three things you are grateful for right now.",
    "What is the best financial advice you've ever received?",
    "If your income doubled tomorrow, what is the first thing you'd do?",
    "How are you actively investing in your own growth right now?",
    "What fear is currently holding you back from making more money?",
    "Write a short thank-you letter to the money you currently have."
];

export default function DailyJournal() {
    const todayStr = new Date().toISOString().split('T')[0];
    const [journalEntries, setJournalEntries] = useLocalStorage('journalEntries', {});

    // The entry for today specifically
    const todayEntry = journalEntries[todayStr] || '';
    const [entry, setEntry] = useState(todayEntry);
    const [prompt, setPrompt] = useState("");
    const [isSaved, setIsSaved] = useState(todayEntry.length > 0);
    const [justSaved, setJustSaved] = useState(false);

    useEffect(() => {
        // Pick a prompt deterministically based on date so it stays the same all day
        const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        setPrompt(JOURNAL_PROMPTS[dayOfYear % JOURNAL_PROMPTS.length]);

        // Reset state if today's entry changes
        setEntry(journalEntries[todayStr] || '');
        setIsSaved((journalEntries[todayStr] || '').length > 0);
    }, [todayStr, journalEntries]);

    const handleSave = () => {
        if (!entry.trim()) return;

        // Vibrate for haptic feedback
        if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }

        // Save to local storage dictionary keyed by date
        setJournalEntries({
            ...journalEntries,
            [todayStr]: entry.trim()
        });

        setIsSaved(true);
        setJustSaved(true);

        // Show the green checkmark animation briefly
        setTimeout(() => {
            setJustSaved(false);
        }, 2000);
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden group">
            {/* Subtle background element */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>

            <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="p-2 bg-zinc-800 rounded-xl border border-zinc-700/50">
                    <PenLine className="w-5 h-5 text-zinc-300" />
                </div>
                <div>
                    <h3 className="text-zinc-100 font-bold font-serif tracking-wide">Daily Mindset Journal</h3>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mt-0.5">Prompt of the Day</p>
                </div>
            </div>

            <div className="mb-4">
                <p className="text-zinc-200 font-medium leading-relaxed italic border-l-2 border-gold-500/30 pl-3 py-1">
                    "{prompt}"
                </p>
            </div>

            <div className="relative z-10">
                <textarea
                    value={entry}
                    onChange={(e) => {
                        setEntry(e.target.value);
                        if (isSaved && e.target.value !== todayEntry) {
                            setIsSaved(false); // They are editing an already saved entry
                        }
                    }}
                    placeholder="Write your thoughts here..."
                    className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-xl p-4 min-h-[100px] text-sm focus:outline-none focus:border-gold-500/50 transition-colors resize-none placeholder:text-zinc-600"
                />

                <div className="mt-3 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={!entry.trim() || isSaved}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${isSaved && !justSaved
                                ? 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                                : justSaved
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                    : 'bg-gold-600 text-zinc-900 border border-gold-500 hover:bg-gold-500'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {justSaved ? (
                            <>
                                <CheckCircle2 className="w-4 h-4" />
                                Saved!
                            </>
                        ) : isSaved ? (
                            'Saved for Today'
                        ) : (
                            'Save Entry'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
