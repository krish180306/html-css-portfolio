import React from 'react';
import { useStore } from '../store';
import { LogOut, Power } from 'lucide-react';

export const StartMenu: React.FC = () => {
  const { startMenuOpen, openWindow, currentUser, setSystemState, closeStartMenu } = useStore();

  if (!startMenuOpen) return null;

  return (
    <div 
      className="absolute bottom-[30px] left-0 w-[380px] bg-white border border-[#00138C] rounded-t-lg shadow-xl z-[100] flex flex-col font-sans select-none"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="bg-titlebar-gradient rounded-t-lg p-2 flex items-center gap-3 border-b border-[#00138C]">
        <div className={`w-12 h-12 rounded-md border-2 border-white/80 overflow-hidden shadow-sm flex items-center justify-center text-3xl select-none ${currentUser === 'Sai Krishnan' ? 'bg-orange-400' : 'bg-blue-400'}`}>
          {currentUser === 'Sai Krishnan' ? '🏎️' : '🦋'}
        </div>
        <span className="text-white font-bold text-lg drop-shadow-md">{currentUser}</span>
      </div>

      {/* Body */}
      <div className="flex bg-white h-[350px]">
        {/* Left Column - Programs */}
        <div className="flex-1 bg-white p-2 border-r border-[#d3d3d3] flex flex-col gap-1 overflow-y-auto">
          <button 
            className="flex items-center gap-3 p-2 hover:bg-[#2f71cd] hover:text-white rounded-sm text-sm font-medium transition-colors text-black group"
            onClick={() => openWindow('ie', 'Internet Explorer', '🌐', 'ie')}
          >
            <span className="text-2xl drop-shadow-sm group-hover:drop-shadow-none">🌐</span>
            <div className="flex flex-col text-left">
              <span className="font-bold">Internet Explorer</span>
              <span className="text-xs text-gray-500 group-hover:text-gray-200">Browse the web</span>
            </div>
          </button>
          
          <button 
            className="flex items-center gap-3 p-2 hover:bg-[#2f71cd] hover:text-white rounded-sm text-sm font-medium transition-colors text-black group"
            onClick={() => openWindow('notepad', 'Notepad', '📝', 'notepad')}
          >
            <span className="text-2xl drop-shadow-sm group-hover:drop-shadow-none">📝</span>
            <div className="flex flex-col text-left">
              <span className="font-bold">Notepad</span>
            </div>
          </button>

          <button 
            className="flex items-center gap-3 p-2 hover:bg-[#2f71cd] hover:text-white rounded-sm text-sm font-medium transition-colors text-black group"
            onClick={() => openWindow('paint', 'Paint', '🎨', 'paint')}
          >
            <span className="text-2xl drop-shadow-sm group-hover:drop-shadow-none">🎨</span>
            <div className="flex flex-col text-left">
              <span className="font-bold">Paint</span>
            </div>
          </button>
          
          <button 
            className="flex items-center gap-3 p-2 hover:bg-[#2f71cd] hover:text-white rounded-sm text-sm font-medium transition-colors text-black group"
            onClick={() => openWindow('cmd', 'Command Prompt', '⌨️', 'cmd')}
          >
            <span className="text-2xl drop-shadow-sm group-hover:drop-shadow-none">⌨️</span>
            <div className="flex flex-col text-left">
              <span className="font-bold">Command Prompt</span>
            </div>
          </button>
          
          <div className="mt-auto pt-2 border-t border-[#d3d3d3]">
            <button className="flex items-center justify-between w-full p-2 hover:bg-[#2f71cd] hover:text-white rounded-sm text-sm font-bold text-black">
              <span>All Programs</span>
              <span className="text-[#3a93ff]">▶</span>
            </button>
          </div>
        </div>

        {/* Right Column - System Folders */}
        <div className="w-[160px] bg-[#d3e5fa] p-2 flex flex-col gap-1 text-xs border-l border-white">
          <button 
            className="flex items-center gap-2 p-1.5 hover:bg-[#2f71cd] hover:text-white rounded-sm transition-colors text-black font-bold"
            onClick={() => openWindow('mycomputer', 'My Computer', '💻', 'mycomputer', { initialView: 'root' })}
          >
            <span className="text-lg">💻</span>
            <span>My Computer</span>
          </button>
          <button 
            className="flex items-center gap-2 p-1.5 hover:bg-[#2f71cd] hover:text-white rounded-sm transition-colors text-black font-bold"
            onClick={() => openWindow('mydocuments', 'My Documents', '📁', 'mycomputer', { initialView: 'documents' })}
          >
            <span className="text-lg">📁</span>
            <span>My Documents</span>
          </button>
          <button 
            className="flex items-center gap-2 p-1.5 hover:bg-[#2f71cd] hover:text-white rounded-sm transition-colors text-black font-bold"
            onClick={() => openWindow('mypictures', 'My Pictures', '🖼️', 'mycomputer', { initialView: 'shared' })}
          >
            <span className="text-lg">🖼️</span>
            <span>My Pictures</span>
          </button>
          
          <div className="my-1 border-t border-[#a6c6ef]"></div>
          
          <button 
            className="flex items-center gap-2 p-1.5 hover:bg-[#2f71cd] hover:text-white rounded-sm transition-colors text-black"
          >
            <span className="text-lg">⚙️</span>
            <span>Control Panel</span>
          </button>
          <button 
            className="flex items-center gap-2 p-1.5 hover:bg-[#2f71cd] hover:text-white rounded-sm transition-colors text-black"
          >
            <span className="text-lg">🖨️</span>
            <span>Printers and Faxes</span>
          </button>
          
          <div className="my-1 border-t border-[#a6c6ef]"></div>
          
          <button 
            className="flex items-center gap-2 p-1.5 hover:bg-[#2f71cd] hover:text-white rounded-sm transition-colors text-black"
          >
            <span className="text-lg">❓</span>
            <span>Help and Support</span>
          </button>
          <button 
            className="flex items-center gap-2 p-1.5 hover:bg-[#2f71cd] hover:text-white rounded-sm transition-colors text-black"
          >
            <span className="text-lg">🔍</span>
            <span>Search</span>
          </button>
          <button 
            className="flex items-center gap-2 p-1.5 hover:bg-[#2f71cd] hover:text-white rounded-sm transition-colors text-black"
          >
            <span className="text-lg">🏃</span>
            <span>Run...</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-titlebar-gradient p-2 flex items-center justify-end gap-3 border-t border-white/20 text-white text-xs font-medium">
        <button 
          onClick={() => {
            closeStartMenu();
            setSystemState('welcome');
          }}
          className="flex items-center gap-1 hover:brightness-110 active:brightness-90 bg-transparent border-none outline-none text-white text-xs font-medium cursor-pointer"
        >
          <div className="w-6 h-6 rounded-sm bg-[#e8a317] flex items-center justify-center shadow-sm">
            <LogOut className="w-4 h-4 text-white" />
          </div>
          <span>Log Off</span>
        </button>
        <button 
          onClick={() => {
            closeStartMenu();
            setSystemState('shutting_down');
          }}
          className="flex items-center gap-1 hover:brightness-110 active:brightness-90 mr-2 bg-transparent border-none outline-none text-white text-xs font-medium cursor-pointer"
        >
          <div className="w-6 h-6 rounded-sm bg-[#e33222] flex items-center justify-center shadow-sm">
            <Power className="w-4 h-4 text-white" />
          </div>
          <span>Turn Off Computer</span>
        </button>
      </div>
    </div>
  );
};
