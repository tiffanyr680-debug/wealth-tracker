import { useState } from 'react';
import { X, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

const VALID_PRO_CODES = [
    'WEALTH2024PRO',
    'MINDSETMASTER',
    'ABUNDANCE100X',
    'TESTPROCODE' // Added for testing
];

export default function SettingsModal({ isOpen, onClose, isPro, setProStatus }) {
    const [code, setCode] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleUnlock = () => {
        if (!code.trim()) return;

        setStatus('loading');

        // Simulate slight network delay
        setTimeout(() => {
            if (VALID_PRO_CODES.includes(code.trim().toUpperCase())) {
                setProStatus(true);
                setStatus('success');
                setMessage('Pro Unlocked Successfully!');

                // Haptic success
                if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
                    window.navigator.vibrate([100, 50, 100]);
                }

                setTimeout(() => {
                    onClose();
                    setStatus('idle');
                    setCode('');
                }, 2000);
            } else {
                setStatus('error');
                setMessage('Invalid code, contact support.');
                if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
                    window.navigator.vibrate(200); // Error rumble
                }
            }
        }, 600);
    };

    const handleRestore = () => {
        setStatus('loading');
        setTimeout(() => {
            // In a real app this might ping a server with a logged-in user.
            // Here we just check local storage, which App.jsx already does, 
            // so this is mostly a placebo/re-check for the MVP flow.
            if (isPro) {
                setStatus('success');
                setMessage('Purchase restored!');
            } else {
                setStatus('error');
                setMessage('No previous purchase found.');
            }
            setTimeout(() => setStatus('idle'), 2000);
        }, 800);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-6 transform transition-all animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-zinc-100">Settings</h2>
                    <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-100 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {!isPro ? (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">Enter Pro Code</label>
                            <p className="text-xs text-zinc-500 mb-3">Check your email after purchase for your code.</p>

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                                    placeholder="e.g. WEALTH2024"
                                    className="flex-1 bg-zinc-950 border border-zinc-700 text-zinc-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-gold-500 uppercase font-mono tracking-wider placeholder:normal-case placeholder:tracking-normal"
                                />
                                <button
                                    onClick={handleUnlock}
                                    disabled={status === 'loading' || !code.trim()}
                                    className="px-4 py-2 bg-gradient-to-r from-gold-600 to-gold-400 text-zinc-950 font-semibold rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                                >
                                    {status === 'loading' ? 'Checking...' : 'Unlock'}
                                </button>
                            </div>

                            {status === 'success' && (
                                <div className="flex items-center gap-2 text-green-400 text-sm mt-3 animate-in fade-in">
                                    <CheckCircle className="w-4 h-4" />
                                    {message}
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="flex items-center gap-2 text-red-400 text-sm mt-3 animate-in fade-in">
                                    <AlertCircle className="w-4 h-4" />
                                    {message}
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t border-zinc-800">
                            <button
                                onClick={handleRestore}
                                className="w-full flex justify-center items-center gap-2 py-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                            >
                                <RefreshCw className={`w-4 h-4 ${status === 'loading' ? 'animate-spin' : ''}`} />
                                Restore Purchase
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <div className="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold-500/20">
                            <CheckCircle className="w-8 h-8 text-gold-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-zinc-100 mb-1">Lifetime Pro Active</h3>
                        <p className="text-sm text-zinc-400">Thank you for investing in yourself.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
