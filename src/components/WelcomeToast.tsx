import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useStore } from '../store';
import { useMobile } from '../hooks/useMobile';

export const WelcomeToast: React.FC = () => {
  const { systemState, currentUser } = useStore();
  const [visible, setVisible] = useState(false);
  const isMobile = useMobile();
  const wasRunning = useRef(false);

  useEffect(() => {
    if (systemState === 'running' && !wasRunning.current) {
      wasRunning.current = true;
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 6000);
      return () => clearTimeout(t);
    }
    if (systemState !== 'running') {
      wasRunning.current = false;
    }
  }, [systemState]);

  if (!visible) return null;

  return (
    <div
      className={`absolute z-[90] w-[min(260px,calc(100vw-16px))] bg-white border border-[#7F9DB9] rounded-md shadow-xl overflow-hidden select-none animate-[toastIn_0.25s_ease-out]
        ${isMobile ? 'right-2 bottom-[52px]' : 'right-3 bottom-[38px]'}`}
    >
      <div className="bg-titlebar-gradient px-2 py-1.5 flex items-center justify-between">
        <span className="text-white text-xs font-bold drop-shadow">Welcome to Windows XP</span>
        <button onClick={() => setVisible(false)} className="text-white/80 hover:text-white">
          <X size={13} />
        </button>
      </div>
      <div className="p-3 flex gap-2.5 items-start">
        <span className="text-2xl leading-none">👋</span>
        <p className="text-xs text-gray-700 leading-relaxed">
          Hi {currentUser.split(' ')[0]}! {isMobile ? 'Tap' : 'Double-click'} a desktop icon or use the Start menu to explore this portfolio.
        </p>
      </div>
      <style>{`@keyframes toastIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
};
