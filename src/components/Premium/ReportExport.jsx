import { Download, FileText } from 'lucide-react';

export default function ReportExport() {
    const handleExport = () => {
        if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }
        window.print();
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden print:hidden">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-800 rounded-xl border border-zinc-700/50">
                        <FileText className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-zinc-100 font-bold font-serif tracking-wide">Monthly Report</h3>
                        <p className="text-xs text-zinc-500">Generate a PDF of your progress</p>
                    </div>
                </div>
            </div>

            <button
                onClick={handleExport}
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 border border-zinc-700"
            >
                <Download className="w-5 h-5 text-blue-400" />
                Export as PDF
            </button>
        </div>
    );
}
