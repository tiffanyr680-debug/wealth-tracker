import { useState } from 'react';
import Header from './components/Header';
import DailyCheckIn from './components/DailyCheckIn';
import AffirmationCard from './components/AffirmationCard';
import GoalTracker from './components/GoalTracker';
import DailyJournal from './components/DailyJournal';
import StreakCounter from './components/StreakCounter';
import PremiumLockedSection from './components/PremiumLockedSection';
import ProModal from './components/ProModal';
import SettingsModal from './components/SettingsModal';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPro, setIsPro] = useLocalStorage('proUnlocked', false);

  return (
    <div className="min-h-screen pb-20">
      <Header
        onOpenPro={() => setIsProModalOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isPro={isPro}
      />

      <main className="max-w-md mx-auto px-4 pt-6 space-y-6">
        <StreakCounter />
        <DailyCheckIn />
        <AffirmationCard />
        <GoalTracker />
        <DailyJournal />

        <div className="pt-8 border-t border-zinc-800">
          <PremiumLockedSection onOpenPro={() => setIsProModalOpen(true)} isPro={isPro} />
        </div>
      </main>

      <ProModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        isPro={isPro}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isPro={isPro}
        setProStatus={setIsPro}
      />
    </div>
  );
}

export default App;
