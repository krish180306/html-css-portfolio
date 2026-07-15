import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import xpLogo from '../assets/xp-logo-new.png';
import { useMobile } from '../hooks/useMobile';

export const Taskbar: React.FC = () => {
  const { toggleStartMenu, startMenuOpen, windows, focusWindow, closeWindow } = useStore();
  const [time, setTime] = useState(new Date());
  const isMobile = useMobile();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const mins = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${mins} ${ampm}`;
  };

  // Open (non-minimized) windows count for mobile badge
  const openCount = windows.filter(w => !w.minimized).length;

  return (
    <div className={`bg-taskbar-gradient w-full flex items-center justify-between z-50 select-none border-t border-[#1042af] shadow-[0_-1px_4px_rgba(0,0,0,0.5)] relative ${isMobile ? 'h-[44px]' : 'h-[30px]'}`}>

      {/* Start Button & Window Tabs */}
      <div className="flex items-center h-full gap-1 flex-1 overflow-hidden">

        {/* Start Button */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleStartMenu(); }}
          className={`
            flex items-center justify-center gap-1 h-full px-2 font-bold text-white italic tracking-wide
            shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.5),3px_0_4px_rgba(0,0,0,0.4)]
            border border-[#145a16] border-l-0
            ${isMobile ? 'rounded-r-md text-base pr-3' : 'rounded-r-full text-[19px] pr-4'}
            ${startMenuOpen ? 'bg-green-700 shadow-[inset_1px_2px_4px_rgba(0,0,0,0.5)]' : 'bg-start-gradient hover:brightness-110'}
          `}
        >
          <img src={xpLogo} alt="Windows Logo" className={`relative -top-[1px] rounded-[2px] ${isMobile ? 'w-7 h-7' : 'w-6 h-6'}`} />
          {!isMobile && <span className="leading-none drop-shadow-[1px_1px_2px_rgba(0,0,0,0.7)] pb-1 pr-1">start</span>}
          {isMobile && openCount > 0 && (
            <span className="absolute top-1 right-0 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold text-white leading-none">
              {openCount}
            </span>
          )}
        </button>

        {/* Divider */}
        <div className="w-px h-full bg-white/20 mx-1 shadow-[1px_0_0_rgba(0,0,0,0.2)]" />

        {/* Open Windows — hidden on mobile (windows are full-screen) */}
        {!isMobile && (
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
              );
            })}
          </div>
        )}

        {/* Mobile: show mini chips for open windows */}
        {isMobile && windows.length > 0 && (
          <div className="flex h-full py-1 gap-1 overflow-x-auto overflow-y-hidden px-1">
            {windows.map((win) => (
              <button
                key={win.id}
                onClick={() => focusWindow(win.id)}
                className="flex items-center gap-1 px-2 h-full rounded-[3px] bg-[#3a75d7] text-white text-xs whitespace-nowrap"
              >
                <span>{win.icon}</span>
                <span className="truncate max-w-[60px] font-medium">{win.title}</span>
                <span
                  onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
                  className="ml-1 text-white/70 text-base leading-none"
                >×</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* System Tray */}
      <div className={`h-full bg-[#0d8eeb] shadow-[inset_1px_0_0_rgba(255,255,255,0.2)] border-l border-[#00138C] flex items-center gap-2 text-white ${isMobile ? 'px-2 text-[11px]' : 'px-3 text-xs'}`}>
        {!isMobile && (
          <div className="flex gap-1 items-center">
            <span title="Volume">🔊</span>
            <span title="Network">📶</span>
          </div>
        )}
        <span className="font-sans cursor-default">{formatTime(time)}</span>
      </div>
    </div>
  );
};
