import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useStore } from '../store';
import xpLogo from '../assets/xp-logo-new.png';
import { useMobile } from '../hooks/useMobile';
import { ChevronLeft, ChevronRight, Monitor, MonitorOff } from 'lucide-react';

export const Taskbar: React.FC = () => {
  const { toggleStartMenu, startMenuOpen, windows, focusWindow, closeWindow, crtEnabled, toggleCrt } = useStore();
  const [time, setTime] = useState(new Date());
  const isMobile = useMobile();

  const tabStripRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hiddenIconsOpen, setHiddenIconsOpen] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = tabStripRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [updateScrollState, windows.length]);

  const scrollTabs = (dir: 'left' | 'right') => {
    tabStripRef.current?.scrollBy({ left: dir === 'left' ? -150 : 150, behavior: 'smooth' });
  };

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
            relative flex items-center justify-center gap-1.5 h-[85%] font-bold text-white italic tracking-wide
            rounded-full border overflow-hidden
            ${isMobile ? 'ml-1 pl-2 pr-3 text-base' : 'ml-1.5 pl-2.5 pr-4 text-[19px]'}
            ${startMenuOpen
              ? 'bg-start-gradient-active border-[#0d2c08] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]'
              : 'bg-start-gradient border-[#145a16] shadow-[0_1px_0_rgba(255,255,255,0.3),2px_1px_4px_rgba(0,0,0,0.5)] hover:brightness-110 active:brightness-95'}
          `}
        >
          {/* Glass gloss highlight across the top half */}
          <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/50 to-white/0 rounded-t-full" />

          <img src={xpLogo} alt="Windows Logo" className={`relative z-10 -top-[1px] drop-shadow-sm ${isMobile ? 'w-7 h-7' : 'w-6 h-6'}`} />
          {!isMobile && <span className="relative z-10 leading-none drop-shadow-[1px_1px_2px_rgba(0,0,0,0.7)] pb-1">start</span>}
          {isMobile && openCount > 0 && (
            <span className="absolute z-10 top-0.5 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold text-white leading-none border border-white/60">
              {openCount}
            </span>
          )}
        </button>

        {/* Divider */}
        <div className="w-px h-full bg-white/20 mx-1 shadow-[1px_0_0_rgba(0,0,0,0.2)]" />

        {/* Open Windows — hidden on mobile (windows are full-screen) */}
        {!isMobile && (
          <div className="flex items-center h-full flex-1 min-w-0">
            {canScrollLeft && (
              <button
                onClick={() => scrollTabs('left')}
                title="Scroll tabs left"
                className="flex-shrink-0 h-full px-0.5 flex items-center justify-center text-white/80 hover:bg-white/10"
              >
                <ChevronLeft size={14} />
              </button>
            )}
            <div
              ref={tabStripRef}
              onScroll={updateScrollState}
              className="flex h-full py-1 gap-[2px] overflow-x-auto overflow-y-hidden px-1 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {windows.map((win) => {
                const isActive = useStore.getState().activeWindowId === win.id && !win.minimized;
                return (
                  <button
                    key={win.id}
                    onClick={() => focusWindow(win.id)}
                    className={`
                      flex items-center gap-1 px-2 py-1 h-full min-w-[150px] max-w-[150px] rounded-[3px] text-white text-xs text-left truncate flex-shrink-0
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
            {canScrollRight && (
              <button
                onClick={() => scrollTabs('right')}
                title="Scroll tabs right"
                className="flex-shrink-0 h-full px-0.5 flex items-center justify-center text-white/80 hover:bg-white/10"
              >
                <ChevronRight size={14} />
              </button>
            )}
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
          <div className="flex gap-2 items-center">
            <button
              onClick={(e) => { e.stopPropagation(); toggleCrt(); }}
              title={crtEnabled ? 'Turn CRT effect off' : 'Turn CRT effect on'}
              className={`flex items-center justify-center hover:brightness-125 ${crtEnabled ? 'text-white' : 'text-white/50'}`}
            >
              {crtEnabled ? <Monitor size={13} /> : <MonitorOff size={13} />}
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setHiddenIconsOpen((v) => !v); }}
              title="Show hidden icons"
              className="flex items-center justify-center text-white/80 hover:text-white"
            >
              {hiddenIconsOpen ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
            </button>

            {hiddenIconsOpen && (
              <div className="flex gap-1 items-center">
                <span title="Volume">🔊</span>
                <span title="Network">📶</span>
              </div>
            )}
          </div>
        )}
        <span className="font-sans cursor-default">{formatTime(time)}</span>
      </div>
    </div>
  );
};
