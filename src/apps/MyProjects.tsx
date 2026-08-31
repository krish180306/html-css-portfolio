import React, { useState } from 'react';
import { profile } from '../data/profile';
import { useMobile } from '../hooks/useMobile';

export const MyProjects: React.FC = () => {
  const [selectedId, setSelectedId] = useState(profile.projects[0].id);
  const selected = profile.projects.find((p) => p.id === selectedId)!;
  const isMobile = useMobile();

  return (
    <div className={`h-full bg-white select-none text-black font-sans ${isMobile ? 'flex flex-col' : 'flex'}`}>
      {/* Project list — Explorer-style blue panel; a horizontal strip on mobile, a sidebar on desktop */}
      <div
        className={
          isMobile
            ? 'w-full flex-shrink-0 bg-gradient-to-b from-[#7BA2E7] to-[#6375D6] overflow-x-auto border-b border-[#D5D5D5]'
            : 'w-52 bg-gradient-to-b from-[#7BA2E7] to-[#6375D6] flex-shrink-0 overflow-y-auto border-r border-[#D5D5D5]'
        }
      >
        {!isMobile && (
          <div className="bg-gradient-to-r from-white to-[#D3E5FA] text-[#00138C] font-bold text-xs px-3 py-2 shadow-sm">
            Projects (D:)
          </div>
        )}
        <div className={isMobile ? 'p-2 flex gap-1' : 'p-2 flex flex-col gap-1'}>
          {profile.projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`flex items-center gap-2 px-2 py-2 rounded text-left text-xs font-medium transition-colors flex-shrink-0
                ${isMobile ? 'flex-col text-center w-20' : ''}
                ${selectedId === p.id
                  ? 'bg-white/90 text-[#00138C] shadow'
                  : 'text-white hover:bg-white/20'}
              `}
            >
              <span className="text-xl">{p.icon}</span>
              <span className="truncate max-w-full">{p.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected project detail */}
      <div className={`flex-1 min-w-0 overflow-y-auto ${isMobile ? 'p-4' : 'p-6'}`}>
        <div className="flex items-start gap-4 border-b border-[#D5D5D5] pb-4 mb-4">
          <span className={isMobile ? 'text-4xl' : 'text-5xl'}>{selected.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className={`font-bold text-[#00138C] break-words ${isMobile ? 'text-lg' : 'text-xl'}`}>{selected.title}</h1>
              {selected.tag && (
                <span className="text-[10px] font-bold uppercase bg-yellow-200 text-yellow-800 border border-yellow-400 rounded-full px-2 py-0.5">
                  {selected.tag}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">{selected.subtitle}</p>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-xs font-bold text-[#00138C] uppercase tracking-wide mb-1.5">Description</h2>
            <p className="text-sm leading-relaxed text-gray-800">{selected.description}</p>
          </div>

          <div>
            <h2 className="text-xs font-bold text-[#00138C] uppercase tracking-wide mb-1.5">Tech Stack</h2>
            <div className="flex flex-wrap gap-1.5">
              {selected.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs bg-[#D3E5FA] text-[#00138C] border border-[#A6C6EF] rounded-full px-2.5 py-1 font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold text-[#00138C] uppercase tracking-wide mb-1.5">Key Features</h2>
            <ul className="list-disc pl-5 space-y-1">
              {selected.features.map((f) => (
                <li key={f} className="text-sm text-gray-800 leading-relaxed">{f}</li>
              ))}
            </ul>
          </div>

          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="self-start text-xs font-medium text-white bg-[#3a75d7] hover:bg-[#2f66c0] rounded px-3 py-1.5 shadow"
          >
            View on GitHub ↗
          </a>
        </div>
      </div>
    </div>
  );
};
