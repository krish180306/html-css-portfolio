import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import xpLogo from '../assets/xp-logo-new.png';

export const Taskbar: React.FC = () => {
  const { toggleStartMenu, startMenuOpen, windows, focusWindow } = useStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const mins = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${mins} ${ampm}`;
  };

  return (
    <div className="h-[30px] bg-taskbar-gradient w-full flex items-center justify-between z-50 select-none border-t border-[#1042af] shadow-[0_-1px_4px_rgba(0,0,0,0.5)] relative">
      
      {/* Start Button & Window Tabs */}
      <div className="flex items-center h-full gap-1 flex-1 overflow-hidden">
        
        {/* Start Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); toggleStartMenu(); }}
          className={`
            flex items-center justify-center gap-1 h-full px-2 pr-4 rounded-r-full font-bold text-white italic text-[19px] tracking-wide
            shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.5),3px_0_4px_rgba(0,0,0,0.4)]
            border border-[#145a16] border-l-0
            ${startMenuOpen ? 'bg-green-700 shadow-[inset_1px_2px_4px_rgba(0,0,0,0.5)]' : 'bg-start-gradient hover:brightness-110'}
          `}
        >
          {/* Windows Logo */}
          <img src={xpLogo} alt="Windows Logo" className="w-6 h-6 relative -top-[1px] rounded-[2px]" />
          <span className="leading-none drop-shadow-[1px_1px_2px_rgba(0,0,0,0.7)] pb-1 pr-1">start</span>
        </button>

        {/* Divider */}
        <div className="w-px h-full bg-white/20 mx-1 shadow-[1px_0_0_rgba(0,0,0,0.2)]"></div>

        {/* Open Windows */}
        <div className="flex h-full py-1 gap-[2px] overflow-x-auto overflow-y-hidden px-1">
          {windows.map((win) => {
            const isActive = useStore.getState().activeWindowId === win.id && !win.minimized;
            return (
              <button
                key={win.id}
                onClick={() => focusWindow(win.id)}
                className={`
                  flex items-center gap-1 px-2 py-1 h-full min-w-[150px] max-w-[150px] rounded-[3px] text-white text-xs text-left truncate
                  ${isActive 
                    ? 'bg-[#1e48a3] shadow-[inset_1px_2px_3px_rgba(0,0,0,0.4)] text-gray-200' 
                    : 'bg-[#3a75d7] hover:bg-[#4882e3] shadow-[inset_1px_1px_1px_rgba(255,255,255,0.3)]'}
                `}
              >
                <span>{win.icon}</span>
                <span className="truncate drop-shadow-md font-medium">{win.title}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* System Tray */}
      <div className="h-full bg-[#0d8eeb] shadow-[inset_1px_0_0_rgba(255,255,255,0.2),inset_-1px_0_0_rgba(0,0,0,0.2)] border-l border-[#00138C] px-3 flex items-center gap-3 text-white text-xs">
        <div className="flex gap-1 items-center">
          {/* Placeholder for icons: Sound, Network */}
          <span title="Volume">🔊</span>
          <span title="Network">📶</span>
        </div>
        <span className="font-sans cursor-default">{formatTime(time)}</span>
      </div>
    </div>
  );
};
