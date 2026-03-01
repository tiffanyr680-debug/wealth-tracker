import { X, CheckCircle2, Sparkles, Mail, Lock } from 'lucide-react';

export default function ProModal({ isOpen, onClose, isPro }) {
    if (!isOpen) return null;

    const benefits = [
        "AI-powered mindset insights",
        "30-day history & trends chart",
        "Exportable monthly PDF reports",
        "Custom daily affirmations",
        "Priority support"
    ];

    if (isPro) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
                <div className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center animate-in zoom-in-95 shadow-2xl">
                    <div className="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold-500/20">
                        <Sparkles className="w-8 h-8 text-gold-400" />
                    </div>
                    <h2 className="text-xl font-bold text-zinc-100 mb-2">You're a Pro Member</h2>
                    <p className="text-zinc-400 text-sm mb-6">Enjoy all premium features. Your mindset is your greatest asset.</p>
                    <button onClick={onClose} className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl font-medium transition-colors">
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-0">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-[2rem] shadow-2xl overflow-hidden transform transition-all animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0 sm:zoom-in-95 max-h-[90vh] overflow-y-auto">

                {/* Header Artwork / Gradient */}
                <div className="relative h-32 bg-gradient-to-br from-gold-600 via-gold-400 to-rose-gold overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors z-10"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="absolute bottom-4 left-6 flex items-center gap-2 text-zinc-950 font-bold text-2xl">
                        <Sparkles className="w-6 h-6" />
                        WealthMindset <span className="font-black bg-zinc-950 text-gold-400 px-2 py-0.5 rounded text-xs align-middle uppercase tracking-wider ml-1">Pro</span>
                    </div>
                </div>

                <div className="p-6">
                    <p className="text-zinc-300 text-sm mb-6 leading-relaxed">
                        Unlock the ultimate tools to rewire your money mindset and build lasting wealth habits.
                    </p>

                    <ul className="space-y-3 mb-8">
                        {benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-sm text-zinc-300">
                                <CheckCircle2 className="w-5 h-5 text-gold-500 fill-gold-500/20 shrink-0" />
                                {benefit}
                            </li>
                        ))}
                    </ul>

                    <div className="space-y-4">
                        <a
                            href="https://buy.stripe.com/test_aFa4gy54X0OLfLA8px"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between w-full p-4 rounded-xl border-2 border-gold-500 bg-gold-500/10 hover:bg-gold-500/20 transition-all group shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                        >
                            <div className="text-left flex-1 border-r border-gold-500/20 mr-4">
                                <p className="font-bold text-lg text-gold-400">Lifetime Pro</p>
                                <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-1">
                                    <Lock className="w-3 h-3" /> Secure Payment
                                </div>
                            </div>
                            <div className="text-right whitespace-nowrap">
                                <p className="font-black text-2xl text-zinc-100">$27</p>
                                <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-0.5">One-time payment, forever access</p>
                            </div>
                        </a>

                        <a
                            href="https://buy.stripe.com/test_00wfZg2WPdBxgPE219"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between w-full p-4 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 transition-colors group"
                        >
                            <div className="text-left flex-1 mr-4">
                                <p className="font-bold text-lg text-zinc-100">Monthly Pro</p>
                                <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-1">
                                    <Lock className="w-3 h-3 text-zinc-500" /> Secure Payment
                                </div>
                            </div>
                            <div className="text-right whitespace-nowrap">
                                <p className="font-black text-2xl text-zinc-100">$7<span className="text-sm font-normal text-zinc-400">/mo</span></p>
                                <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-0.5">Cancel anytime</p>
                            </div>
                        </a>

                        <div className="flex items-start gap-3 p-3 bg-zinc-950/50 rounded-lg border border-zinc-800">
                            <Mail className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                            <p className="text-xs text-zinc-400 leading-relaxed text-center w-full">
                                After payment, check your email for your Pro Code to unlock features.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
