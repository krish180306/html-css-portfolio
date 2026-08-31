import React, { useState } from 'react';
import { profile } from '../data/profile';

type Tab = 'general' | 'education' | 'skills' | 'achievements';

const TABS: { id: Tab; label: string }[] = [
  { id: 'general', label: 'General' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
];

export const AboutMe: React.FC = () => {
  const [tab, setTab] = useState<Tab>('general');

  return (
    <div className="flex flex-col h-full bg-[#ECE9D8] select-none text-black font-sans p-3 gap-0">
      {/* Tab strip — XP "System Properties" style folder tabs */}
      <div className="flex items-end gap-[2px] px-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-1.5 text-xs font-medium rounded-t-md border border-b-0 relative
              ${tab === t.id
                ? 'bg-white border-[#ACA899] z-10 -mb-px font-bold text-[#00138C]'
                : 'bg-[#DDD9C8] border-[#ACA899] text-gray-700 hover:bg-[#E8E4D4] translate-y-[1px]'}
            `}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content panel */}
      <div className="flex-1 bg-white border border-[#ACA899] rounded-b-md rounded-tr-md overflow-y-auto p-5">
        {tab === 'general' && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4 border-b border-[#D5D5D5] pb-4">
              <div className="w-16 h-16 rounded-md bg-orange-400 border-2 border-white shadow flex items-center justify-center text-3xl flex-shrink-0">
                🏎️
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#00138C]">{profile.name}</h1>
                <p className="text-sm text-gray-600">{profile.role}</p>
                <p className="text-xs text-gray-500 mt-0.5">{profile.location}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold text-[#00138C] uppercase tracking-wide mb-1.5">Objective</h2>
              <p className="text-sm leading-relaxed text-gray-800">{profile.objective}</p>
            </div>

            <div className="bg-[#F1F0E8] border border-[#D5D5D5] rounded p-3 text-xs">
              <div className="grid grid-cols-[110px_1fr] gap-y-1.5">
                <span className="text-gray-500">Registered to:</span>
                <span className="font-medium">{profile.name}</span>
                <span className="text-gray-500">Institution:</span>
                <span className="font-medium">{profile.education.school}</span>
                <span className="text-gray-500">Email:</span>
                <a href={`mailto:${profile.email}`} className="font-medium text-blue-700 hover:underline">{profile.email}</a>
                <span className="text-gray-500">Phone:</span>
                <span className="font-medium">{profile.phone}</span>
              </div>
            </div>
          </div>
        )}

        {tab === 'education' && (
          <div className="flex flex-col gap-4">
            <div className="border border-[#D5D5D5] rounded p-4 bg-[#F8F8F4]">
              <div className="flex justify-between items-baseline mb-1">
                <h2 className="font-bold text-[#00138C]">{profile.education.degree}</h2>
                <span className="text-xs text-gray-500">{profile.education.period}</span>
              </div>
              <p className="text-sm text-gray-700">{profile.education.school}</p>
              <p className="text-sm text-gray-700 font-medium mt-1">{profile.education.gpa}</p>
            </div>

            <div>
              <h2 className="text-xs font-bold text-[#00138C] uppercase tracking-wide mb-2">Research Experience</h2>
              {profile.research.map((r) => (
                <div key={r.title} className="border border-[#D5D5D5] rounded p-3 bg-[#F8F8F4] mb-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-sm">{r.title}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{r.period}</span>
                  </div>
                  <ul className="list-disc pl-5 mt-1.5 space-y-1">
                    {r.points.map((p) => (
                      <li key={p} className="text-xs text-gray-700 leading-relaxed">{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'skills' && (
          <div className="flex flex-col gap-4">
            {Object.entries(profile.skills).map(([category, items]) => (
              <div key={category}>
                <h2 className="text-xs font-bold text-[#00138C] uppercase tracking-wide mb-2">{category}</h2>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="text-xs bg-[#D3E5FA] text-[#00138C] border border-[#A6C6EF] rounded-full px-2.5 py-1 font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'achievements' && (
          <ul className="flex flex-col gap-2.5">
            {profile.achievements.map((a) => (
              <li key={a} className="flex items-start gap-2 text-sm text-gray-800">
                <span className="text-yellow-500 mt-0.5">🏆</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
