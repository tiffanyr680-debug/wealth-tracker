import { X } from 'lucide-react';

export default function HowToUseModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-sm max-h-[85vh] overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-6 transform transition-all animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-6 sticky top-0 bg-zinc-900 pt-2 pb-2 border-b border-zinc-800 z-10">
                    <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                        <span>ℹ️</span> How to Use
                    </h2>
                    <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-100 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-6 text-base text-zinc-300">
                    <section>
                        <h3 className="text-zinc-100 font-semibold mb-2">✨ No Download Needed!</h3>
                        <p>This is a web app. Open it in your browser and start instantly.</p>
                    </section>

                    <section>
                        <h3 className="text-zinc-100 font-semibold mb-2">📱 ON PHONE:</h3>
                        <ol className="list-decimal list-inside space-y-1 ml-1 text-zinc-400">
                            <li>Tap the link (from Instagram or bookmark)</li>
                            <li>App opens in your browser</li>
                            <li>Start tracking your mindset!</li>
                        </ol>
                    </section>

                    <section className="bg-gradient-to-br from-gold-900/30 to-zinc-900 border border-gold-500/20 p-4 rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.05)]">
                        <h3 className="text-gold-400 font-semibold mb-2 flex flex-col gap-1">
                            <span className="text-sm tracking-wider uppercase opacity-80">💡 PRO TIP:</span>
                            <span className="text-zinc-100">Add to Home Screen</span>
                        </h3>
                        <p className="mb-3 text-sm">Make it feel like a real app!</p>
                        <ul className="space-y-2 text-sm text-zinc-400">
                            <li className="flex gap-2">
                                <span className="text-zinc-500">•</span>
                                <span><strong className="text-zinc-300">iPhone:</strong> Tap Share (□↑) → "Add to Home Screen"</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-zinc-500">•</span>
                                <span><strong className="text-zinc-300">Android:</strong> Tap ⋮ (menu) → "Add to Home screen"</span>
                            </li>
                        </ul>
                        <p className="mt-3 text-sm text-zinc-300 font-medium">Now you can open it from your home screen icon! ✨</p>
                    </section>

                    <section>
                        <h3 className="text-zinc-100 font-semibold mb-2">💻 ON COMPUTER:</h3>
                        <ol className="list-decimal list-inside space-y-1 ml-1 text-zinc-400">
                            <li>Open any browser</li>
                            <li>Go to: wealthmindsetapp.netlify.app</li>
                            <li>Bookmark it (Ctrl+D or Cmd+D)</li>
                        </ol>
                    </section>

                    <section>
                        <h3 className="text-green-400 font-semibold mb-2">✅ THAT'S IT!</h3>
                        <ul className="space-y-1 text-zinc-400">
                            <li>• No sign-up required</li>
                            <li>• Your data saves automatically</li>
                            <li>• Free forever • Upgrade to Pro anytime</li>
                        </ul>
                    </section>

                </div>

                <div className="mt-8 pt-4 border-t border-zinc-800">
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-zinc-100 text-zinc-900 font-bold rounded-xl shadow-lg hover:bg-white transition-colors"
                    >
                        Got it!
                    </button>
                </div>
            </div>
        </div>
    );
}
