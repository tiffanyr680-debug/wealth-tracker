import { useState } from 'react';
import { X, CheckCircle, AlertCircle, RefreshCw, Info } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import HowToUseModal from './HowToUseModal';

const VALID_PRO_CODES = [
    'WEALTH2024PRO',
    'MINDSETMASTER',
    'ABUNDANCE100X',
    'TESTPROCODE' // Added for testing
];

const DEVELOPER_CODES = [
    'developer2026',
    'builder123',
    'tiffany6459@gmail.com'
];

export default function SettingsModal({ isOpen, onClose, isPro, setProStatus }) {
    const [code, setCode] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    // How To Use Guide State
    const [isHowToUseOpen, setIsHowToUseOpen] = useState(false);
    const [hasSeenHowToUseGuide, setHasSeenHowToUseGuide] = useLocalStorage('hasSeenHowToUseGuide', false);

    if (!isOpen && !isHowToUseOpen) return null; // Keep alive if child is open so it renders

    const handleUnlock = () => {
        if (!code.trim()) return;

        setStatus('loading');

        // Simulate slight network delay
        setTimeout(() => {
            const enteredCode = code.trim().toLowerCase();
            const enteredCodeUpper = code.trim().toUpperCase();

            // Check against lowercase Developer codes
            let isDeveloper = false;
            let debugLog = `Input: '${enteredCode}' | `;
            for (let i = 0; i < DEVELOPER_CODES.length; i++) {
                const targetCode = DEVELOPER_CODES[i].toLowerCase().trim();
                debugLog += `Checking: '${targetCode}' `;
                if (targetCode === enteredCode) {
                    isDeveloper = true;
                    break;
                }
            }

            if (isDeveloper) {
                setProStatus(true);
                setStatus('success');
                setMessage('Developer access granted ✅');

                // Haptic success
                if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
                    window.navigator.vibrate([100, 50, 100]);
                }

                setTimeout(() => {
                    onClose();
                    setStatus('idle');
                    setCode('');
                }, 2000);
            } else if (VALID_PRO_CODES.includes(enteredCodeUpper)) {
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
                setMessage(`Invalid code (Debug: ${debugLog})`);
                if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
                    window.navigator.vibrate(200); // Error rumble
                }
            }
        }, 600);
    };

    const handleRestore = () => {
        setStatus('loading');
        setTimeout(() => {
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

    const handleOpenHowToUse = () => {
        setHasSeenHowToUseGuide(true);
        setIsHowToUseOpen(true);
    };

    return (
        <>
            {/* Render Settings Modal ONLY if it's supposed to be open */}
            {isOpen && (
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

                        {/* How To Use Button & Tooltip Section */}
                        <div className="mb-6 relative">
                            <button
                                onClick={handleOpenHowToUse}
                                className="w-full flex items-center justify-between p-4 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 rounded-2xl transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 group-hover:scale-110 transition-transform">
                                        <Info className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-zinc-100">How to Use & Tips</span>
                                </div>
                                <span className="text-zinc-500 text-sm opacity-60">ℹ️</span>
                            </button>

                            {/* Tooltip */}
                            {!hasSeenHowToUseGuide && (
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-10 w-max max-w-[280px] bg-gold-500 text-zinc-950 font-semibold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-xl animate-bounce shadow-gold-500/20">
                                    New here? Tap 'How to Use' for quick instructions
                                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gold-500 rotate-45"></div>
                                </div>
                            )}
                        </div>

                        {!isPro ? (
                            <div className="space-y-4 pt-4 border-t border-zinc-800">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-300 mb-1">Enter Pro Code</label>
                                    <p className="text-xs text-zinc-500 mb-3">Check your email after purchase for your code.</p>

                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            placeholder="e.g. WEALTH2024"
                                            autoCapitalize="none"
                                            autoComplete="off"
                                            autoCorrect="off"
                                            className="flex-1 bg-zinc-950 border border-zinc-700 text-zinc-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-gold-500 font-mono tracking-wider"
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
                            <div className="text-center py-6 pt-8 border-t border-zinc-800 space-y-4">
                                <div>
                                    <div className="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold-500/20 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                                        <CheckCircle className="w-8 h-8 text-gold-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-zinc-100 mb-1">Lifetime Pro Active</h3>
                                    <p className="text-sm text-zinc-400">Thank you for investing in yourself.</p>
                                </div>

                                {/* Deactivate Pro Feature */}
                                <div className="pt-6 border-t border-zinc-800">
                                    {!status.startsWith('deactivate') ? (
                                        <button
                                            onClick={() => setStatus('deactivate_prompt')}
                                            className="w-full flex justify-center items-center py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-colors border border-transparent hover:border-red-400/20"
                                        >
                                            Deactivate My Pro Access
                                        </button>
                                    ) : status === 'deactivate_prompt' ? (
                                        <div className="text-left bg-red-950/20 p-4 rounded-xl border border-red-500/30 animate-in fade-in zoom-in-95">
                                            <p className="text-sm font-semibold text-red-400 mb-2">Are you sure you want to deactivate?</p>
                                            <p className="text-xs text-zinc-400 mb-3">Type your Pro Code to confirm:</p>
                                            <input
                                                type="text"
                                                value={code}
                                                onChange={(e) => setCode(e.target.value)}
                                                placeholder="e.g. WEALTH2024PRO"
                                                autoCapitalize="none"
                                                autoComplete="off"
                                                autoCorrect="off"
                                                className="w-full bg-zinc-950 border border-red-900 focus:border-red-400 text-zinc-100 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none font-mono"
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setStatus('idle');
                                                        setCode('');
                                                    }}
                                                    className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs font-medium transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        const enteredDeactivateCode = code.trim().toLowerCase();
                                                        const enteredDeactivateCodeUpper = code.trim().toUpperCase();

                                                        let isDevDeactivate = false;
                                                        for (let i = 0; i < DEVELOPER_CODES.length; i++) {
                                                            if (DEVELOPER_CODES[i].toLowerCase().trim() === enteredDeactivateCode) {
                                                                isDevDeactivate = true;
                                                                break;
                                                            }
                                                        }

                                                        if (isDevDeactivate || VALID_PRO_CODES.includes(enteredDeactivateCodeUpper)) {
                                                            setProStatus(false);
                                                            setStatus('deactivate_success');
                                                            setCode('');
                                                        } else {
                                                            setStatus('deactivate_error');
                                                        }
                                                    }}
                                                    className="flex-1 py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg text-xs font-medium transition-colors"
                                                >
                                                    Confirm Deactivation
                                                </button>
                                            </div>
                                        </div>
                                    ) : status === 'deactivate_error' ? (
                                        <div className="text-left bg-red-950/20 p-4 rounded-xl border border-red-500/30 animate-in fade-in">
                                            <div className="flex items-center gap-2 text-red-400 text-sm mb-3">
                                                <AlertCircle className="w-4 h-4" />
                                                Invalid code.
                                            </div>
                                            <button
                                                onClick={() => setStatus('deactivate_prompt')}
                                                className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs font-medium transition-colors"
                                            >
                                                Try Again
                                            </button>
                                        </div>
                                    ) : status === 'deactivate_success' ? (
                                        <div className="text-left bg-green-950/20 p-4 rounded-xl border border-green-500/30 animate-in fade-in">
                                            <div className="flex items-start gap-2 text-green-400 text-sm">
                                                <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                                <p className="leading-relaxed text-xs">Pro access has been deactivated. You can reactivate anytime by entering your Pro Code again.</p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setStatus('idle');
                                                    onClose();
                                                }}
                                                className="w-full mt-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs font-medium transition-colors"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* How To Use Modal Rendered Outside Settings Modal for z-index stacking */}
            <HowToUseModal
                isOpen={isHowToUseOpen}
                onClose={() => setIsHowToUseOpen(false)}
            />
        </>
    );
}
