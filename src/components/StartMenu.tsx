import React, { useState } from 'react';
import { useStore } from '../store';
import { LogOut, Power, Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './BrandIcons';
import { profile, resumeText } from '../data/profile';
import { useMobile } from '../hooks/useMobile';

const ALL_APPS: { id: string; title: string; icon: string; appType: string; appProps?: Record<string, unknown> }[] = [
  { id: 'aboutme', title: 'About Me', icon: '🧑‍💻', appType: 'aboutme' },
  { id: 'myprojects', title: 'My Projects', icon: '🗂️', appType: 'myprojects' },
  { id: 'contactme', title: 'Contact Me', icon: '✉️', appType: 'contactme' },
  { id: 'resume', title: 'Resume.txt', icon: '📄', appType: 'notepad', appProps: { initialText: resumeText } },
  { id: 'mycomputer', title: 'My Computer', icon: '💻', appType: 'mycomputer', appProps: { initialView: 'root' } },
  { id: 'mydocuments', title: 'My Documents', icon: '📁', appType: 'mycomputer', appProps: { initialView: 'documents' } },
  { id: 'ie', title: 'Internet Explorer', icon: '🌐', appType: 'ie' },
  { id: 'notepad', title: 'Notepad', icon: '📝', appType: 'notepad' },
  { id: 'paint', title: 'Paint', icon: '🎨', appType: 'paint' },
  { id: 'cmd', title: 'Command Prompt', icon: '⌨️', appType: 'cmd' },
];

export const StartMenu: React.FC = () => {
  const { startMenuOpen, openWindow, currentUser, setSystemState, closeStartMenu, logOff } = useStore();
  const [programsOpen, setProgramsOpen] = useState(false);
  const [wasOpen, setWasOpen] = useState(startMenuOpen);
  const isMobile = useMobile();

  // Reset the flyout when the menu itself closes — adjusting state during
  // render (React's recommended pattern) instead of a setState-in-effect.
  if (startMenuOpen !== wasOpen) {
    setWasOpen(startMenuOpen);
    if (!startMenuOpen) setProgramsOpen(false);
  }

  if (!startMenuOpen) return null;

  const launch = (app: (typeof ALL_APPS)[number]) => {
    openWindow(app.id, app.title, app.icon, app.appType, app.appProps);
    setProgramsOpen(false);
  };

  return (
    <div
      className={`absolute left-0 w-[min(380px,calc(100vw-8px))] bg-white border border-[#00138C] rounded-t-lg shadow-xl z-[100] flex flex-col font-sans select-none ${isMobile ? 'bottom-[44px]' : 'bottom-[30px]'}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="bg-titlebar-gradient rounded-t-lg p-2 flex items-center justify-between gap-3 border-b border-[#00138C]">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-md border-2 border-white/80 overflow-hidden shadow-sm flex items-center justify-center text-3xl select-none ${currentUser === 'Sai Krishnan' ? 'bg-orange-400' : 'bg-blue-400'}`}>
            {currentUser === 'Sai Krishnan' ? '🏎️' : '🦋'}
          </div>
          <span className="text-white font-bold text-lg drop-shadow-md">{currentUser}</span>
        </div>

        {/* Social quick links */}
        <div className="flex items-center gap-1.5 pr-1">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            title="GitHub"
            className="w-7 h-7 rounded-sm bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <GitHubIcon className="w-4 h-4 text-white" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
            className="w-7 h-7 rounded-sm bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <LinkedInIcon className="w-4 h-4 text-white" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            title="Email"
            className="w-7 h-7 rounded-sm bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <Mail className="w-4 h-4 text-white" />
          </a>
        </div>
      </div>

      {/* Body */}
      <div className="flex bg-white h-[350px]">
        {/* Left Column - Programs */}
        <div className="flex-1 bg-white p-2 border-r border-[#d3d3d3] flex flex-col gap-1 overflow-y-auto">
          {/* Pinned portfolio apps — larger, with subtitle */}
          <button
            className="flex items-center gap-3 p-2 hover:bg-[#2f71cd] hover:text-white rounded-sm text-sm font-medium transition-colors text-black group"
            onClick={() => launch(ALL_APPS[0])}
          >
            <span className="text-2xl drop-shadow-sm group-hover:drop-shadow-none">🧑‍💻</span>
            <div className="flex flex-col text-left">
              <span className="font-bold">About Me</span>
              <span className="text-xs text-gray-500 group-hover:text-gray-200">Who I am</span>
            </div>
          </button>
          <button
            className="flex items-center gap-3 p-2 hover:bg-[#2f71cd] hover:text-white rounded-sm text-sm font-medium transition-colors text-black group"
            onClick={() => launch(ALL_APPS[1])}
          >
            <span className="text-2xl drop-shadow-sm group-hover:drop-shadow-none">🗂️</span>
            <div className="flex flex-col text-left">
              <span className="font-bold">My Projects</span>
              <span className="text-xs text-gray-500 group-hover:text-gray-200">View my work</span>
            </div>
          </button>
          <button
            className="flex items-center gap-3 p-2 hover:bg-[#2f71cd] hover:text-white rounded-sm text-sm font-medium transition-colors text-black group"
            onClick={() => launch(ALL_APPS[2])}
          >
            <span className="text-2xl drop-shadow-sm group-hover:drop-shadow-none">✉️</span>
            <div className="flex flex-col text-left">
              <span className="font-bold">Contact Me</span>
              <span className="text-xs text-gray-500 group-hover:text-gray-200">Send me a message</span>
            </div>
          </button>

          <div className="my-1 border-t border-[#d3d3d3]" />

          {/* Regular programs */}
          <button
            className="flex items-center gap-3 p-2 hover:bg-[#2f71cd] hover:text-white rounded-sm text-sm font-medium transition-colors text-black group"
            onClick={() => launch(ALL_APPS[3])}
          >
            <span className="text-2xl drop-shadow-sm group-hover:drop-shadow-none">📄</span>
            <span className="font-bold">My Resume</span>
          </button>
          <button
            className="flex items-center gap-3 p-2 hover:bg-[#2f71cd] hover:text-white rounded-sm text-sm font-medium transition-colors text-black group"
            onClick={() => launch(ALL_APPS[6])}
          >
            <span className="text-2xl drop-shadow-sm group-hover:drop-shadow-none">🌐</span>
            <span className="font-bold">Internet Explorer</span>
          </button>
          <button
            className="flex items-center gap-3 p-2 hover:bg-[#2f71cd] hover:text-white rounded-sm text-sm font-medium transition-colors text-black group"
            onClick={() => launch(ALL_APPS[7])}
          >
            <span className="text-2xl drop-shadow-sm group-hover:drop-shadow-none">📝</span>
            <span className="font-bold">Notepad</span>
          </button>

          {/* All Programs flyout trigger */}
          <div className="mt-auto pt-2 border-t border-[#d3d3d3] relative">
            <button
              onClick={(e) => { e.stopPropagation(); setProgramsOpen((v) => !v); }}
              onMouseEnter={() => setProgramsOpen(true)}
              className={`flex items-center justify-between w-full p-2 rounded-sm text-sm font-bold text-black ${programsOpen ? 'bg-[#2f71cd] text-white' : 'hover:bg-[#2f71cd] hover:text-white'}`}
            >
              <span>All Programs</span>
              <span className={programsOpen ? 'text-white' : 'text-[#3a93ff]'}>▶</span>
            </button>

            {/* Cascading flyout — pops upward and full-width on mobile (no room to the right) */}
            {programsOpen && (
              <div
                className={
                  isMobile
                    ? 'absolute z-10 bottom-full left-0 mb-[1px] w-full max-h-[220px] overflow-y-auto bg-white border border-[#00138C] rounded shadow-xl flex flex-col p-1.5 gap-0.5'
                    : 'absolute bottom-0 left-full ml-[1px] w-[220px] bg-white border border-[#00138C] rounded shadow-xl flex flex-col p-1.5 gap-0.5'
                }
                onMouseLeave={() => setProgramsOpen(false)}
              >
                {ALL_APPS.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => launch(app)}
                    className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-[#2f71cd] hover:text-white rounded-sm text-xs font-medium text-black text-left"
                  >
                    <span className="text-base">{app.icon}</span>
                    <span>{app.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - System Folders */}
        <div className={`${isMobile ? 'w-[130px]' : 'w-[160px]'} bg-[#d3e5fa] p-2 flex flex-col gap-1 text-xs border-l border-white`}>
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
            logOff();
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
