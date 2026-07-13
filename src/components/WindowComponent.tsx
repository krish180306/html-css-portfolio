import React from 'react';
import { Rnd } from 'react-rnd';
import { useStore } from '../store';
import type { WindowState } from '../store';
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
}

export const WindowComponent: React.FC<WindowProps> = ({ window, children }) => {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, activeWindowId } = useStore();
  const isActive = activeWindowId === window.id;

  if (window.minimized) return null;

  return (
    <Rnd
      default={{
        x: 50 + (window.zIndex * 15) % 200,
        y: 50 + (window.zIndex * 15) % 200,
        width: 600,
        height: 400,
      }}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      dragHandleClassName="window-drag-handle"
      onMouseDown={() => focusWindow(window.id)}
      style={{ zIndex: window.zIndex }}
      disableDragging={window.maximized}
      enableResizing={!window.maximized}
      size={window.maximized ? { width: '100%', height: '100%' } : undefined}
      position={window.maximized ? { x: 0, y: 0 } : undefined}
      className={`absolute ${window.maximized ? '!w-full !h-full !inset-0' : ''}`}
    >
      <div className={`xp-window w-full h-full ${isActive ? 'shadow-[0_4px_12px_rgba(0,0,0,0.5)]' : 'shadow-[0_2px_6px_rgba(0,0,0,0.3)] opacity-95'}`}>
        {/* Titlebar */}
        <div 
          className={`window-drag-handle flex items-center justify-between p-[2px] pb-[3px] select-none ${isActive ? 'xp-titlebar' : 'xp-titlebar-inactive'}`}
          onDoubleClick={() => maximizeWindow(window.id)}
        >
          <div className="flex items-center gap-1 overflow-hidden pl-1">
            <span className="text-sm drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]">{window.icon}</span>
            <span className="text-[13px] text-white font-bold tracking-wide drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)] truncate">{window.title}</span>
          </div>
          
          <div className="flex items-center gap-[2px] pr-1">
            <button 
              onClick={(e) => { e.stopPropagation(); minimizeWindow(window.id); }}
              className="w-[22px] h-[22px] bg-gradient-to-b from-[#245EDC] to-[#0d3f9e] hover:from-[#3a83ff] hover:to-[#175ce0] active:from-[#0d3f9e] active:to-[#092c73] border border-white/60 rounded-[3px] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.5),0_1px_2px_rgba(0,0,0,0.3)] flex items-center justify-center text-white"
            >
              <Minus size={14} strokeWidth={3} className="mt-1" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); maximizeWindow(window.id); }}
              className="w-[22px] h-[22px] bg-gradient-to-b from-[#245EDC] to-[#0d3f9e] hover:from-[#3a83ff] hover:to-[#175ce0] active:from-[#0d3f9e] active:to-[#092c73] border border-white/60 rounded-[3px] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.5),0_1px_2px_rgba(0,0,0,0.3)] flex items-center justify-center text-white"
            >
              <Square size={11} strokeWidth={3} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); closeWindow(window.id); }}
              className="w-[22px] h-[22px] bg-gradient-to-b from-[#E81123] to-[#b30815] hover:from-[#f05c68] hover:to-[#cf1d29] active:from-[#b30815] active:to-[#73050d] border border-white/60 rounded-[3px] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.5),0_1px_2px_rgba(0,0,0,0.3)] flex items-center justify-center text-white ml-[2px]"
            >
              <X size={14} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white border-[3px] border-[#0055EA] overflow-hidden relative m-[2px] mt-0 border-t-0">
          <div className="absolute inset-0 overflow-auto text-black">
            {children}
          </div>
        </div>
      </div>
    </Rnd>
  );
};
