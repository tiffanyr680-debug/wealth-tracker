import { useState } from 'react';
import { Target, Pencil, Check } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function GoalTracker() {
    const [goal, setGoal] = useLocalStorage('primaryGoal', 'Save $10,000 this year');
    const [progress, setProgress] = useLocalStorage('goalProgress', 25);
    const [isEditing, setIsEditing] = useState(false);
    const [tempGoal, setTempGoal] = useState(goal);

    const handleSave = () => {
        setGoal(tempGoal);
        setIsEditing(false);
    };

    const increaseProgress = () => {
        if (progress < 100) setProgress(Math.min(100, progress + 5));
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-gold-500" />
                <h3 className="text-zinc-100 font-semibold text-base">Main Wealth Goal</h3>
            </div>

            {isEditing ? (
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={tempGoal}
                        onChange={(e) => setTempGoal(e.target.value)}
                        className="flex-1 bg-zinc-950 border border-zinc-700 text-zinc-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold-500"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    />
                    <button
                        onClick={handleSave}
                        className="p-2 bg-gold-500 text-zinc-950 rounded-lg hover:bg-gold-400"
                    >
                        <Check className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div className="flex justify-between items-center mb-4 group cursor-pointer" onClick={() => { setTempGoal(goal); setIsEditing(true); }}>
                    <p className="text-zinc-300 text-sm font-medium">{goal}</p>
                    <Pencil className="w-3.5 h-3.5 text-zinc-600 group-hover:text-gold-500 transition-colors" />
                </div>
            )}

            <div className="space-y-2">
                <div className="flex justify-between text-xs text-zinc-400">
                    <span>Progress</span>
                    <span className="font-medium text-gold-400">{progress}%</span>
                </div>

                <div
                    className="h-2.5 w-full bg-zinc-800 rounded-full overflow-hidden cursor-pointer"
                    onClick={increaseProgress}
                    title="Click to increase progress"
                >
                    <div
                        className="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-500 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-[10px] text-zinc-600 text-center mt-2">Tap progress bar to update</p>
            </div>
        </div>
    );
}
