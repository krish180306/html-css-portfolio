import React, { useState } from 'react';
import { profile } from '../data/profile';

export const InternetExplorer: React.FC = () => {
  const [url, setUrl] = useState('https://portfolio.com/about-me');

  const pages: Record<string, React.ReactNode> = {
    'https://portfolio.com/about-me': (
      <div className="p-8 max-w-3xl mx-auto font-serif">
        <h1 className="text-4xl font-bold text-blue-900 mb-2 border-b-2 border-blue-900 pb-2">{profile.name.toUpperCase()}</h1>
        <p className="text-sm text-gray-600 mb-6">{profile.role} | {profile.education.school}</p>

        <div className="space-y-6 text-lg">
          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-3">Objective</h2>
            <p className="leading-relaxed">{profile.objective}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-3">Education</h2>
            <div className="flex justify-between items-baseline">
              <span className="font-bold">{profile.education.degree}</span>
              <span className="text-sm text-gray-600">{profile.education.period}</span>
            </div>
            <p>{profile.education.school} ({profile.education.gpa})</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-3">Skills</h2>
            <ul className="list-disc pl-6 space-y-1">
              {Object.entries(profile.skills).map(([category, items]) => (
                <li key={category}><strong>{category}:</strong> {items.join(', ')}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    ),
    [profile.github]: (
      <div className="p-8 max-w-4xl mx-auto font-sans">
        <div className="flex items-center gap-4 mb-8 border-b pb-4">
          <div className="text-5xl">🐙</div>
          <div>
            <h1 className="text-3xl font-bold">{profile.githubHandle}</h1>
            <p className="text-gray-600">Repositories & Open Source Contributions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.projects.map((p) => (
            <div key={p.id} className="border border-gray-300 p-4 rounded hover:border-blue-500 cursor-pointer">
              <h3 className="text-xl font-bold text-blue-600 mb-2">{p.title}</h3>
              <p className="text-sm mb-3">{p.subtitle}. {p.description}</p>
              <div className="flex gap-2 text-xs text-gray-600 flex-wrap">
                {p.tech.map((t) => (
                  <span key={t} className="px-2 py-1 bg-gray-100 rounded">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    [profile.linkedin]: (
      <div className="p-8 max-w-3xl mx-auto font-sans bg-[#F3F2EF] h-full">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl overflow-hidden">
              👨‍💻
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-lg text-gray-600 mb-2">{profile.role} at {profile.education.school} | Machine Learning & Full-stack</p>
              <p className="text-sm text-gray-500 mb-4">{profile.location}, India</p>
              <button className="bg-blue-600 text-white px-6 py-1.5 rounded-full font-bold hover:bg-blue-700">Connect</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Experience & Achievements</h2>
          <div className="space-y-4">
            {profile.research.map((r) => (
              <div key={r.title}>
                <h3 className="font-bold text-gray-800">{r.title}</h3>
                <p className="text-sm text-gray-500">{r.period}</p>
                <p className="text-sm mt-1">{r.points[0]}</p>
              </div>
            ))}
            <hr />
            {profile.achievements.map((a) => (
              <div key={a}>
                <p className="text-sm">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="flex flex-col h-full bg-white font-sans text-black select-none">
      {/* Menu Bar */}
      <div className="flex gap-4 px-2 py-1 bg-[#ECE9D8] text-xs border-b border-[#D5D5D5]">
        <span className="hover:bg-blue-500 hover:text-white px-1 cursor-pointer">File</span>
        <span className="hover:bg-blue-500 hover:text-white px-1 cursor-pointer">Edit</span>
        <span className="hover:bg-blue-500 hover:text-white px-1 cursor-pointer">View</span>
        <span className="hover:bg-blue-500 hover:text-white px-1 cursor-pointer">Favorites</span>
        <span className="hover:bg-blue-500 hover:text-white px-1 cursor-pointer">Tools</span>
        <span className="hover:bg-blue-500 hover:text-white px-1 cursor-pointer">Help</span>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-2 py-2 bg-[#ECE9D8] border-b border-[#D5D5D5]">
        <button className="flex flex-col items-center justify-center hover:bg-black/5 px-2 py-1 rounded gap-1 min-w-[50px]">
          <span className="text-xl bg-green-500 rounded-full w-8 h-8 flex items-center justify-center text-white shadow-sm border border-green-700">⬅️</span>
          <span className="text-[10px]">Back</span>
        </button>
        <button className="flex flex-col items-center justify-center hover:bg-black/5 px-2 py-1 rounded gap-1 min-w-[50px]">
          <span className="text-xl bg-green-500 rounded-full w-8 h-8 flex items-center justify-center text-white shadow-sm border border-green-700 opacity-50">➡️</span>
          <span className="text-[10px] text-gray-500">Forward</span>
        </button>
        <div className="w-px h-10 bg-black/20 mx-1"></div>
        <button className="flex flex-col items-center justify-center hover:bg-black/5 px-2 py-1 rounded gap-1">
          <span className="text-xl">🛑</span>
          <span className="text-[10px]">Stop</span>
        </button>
        <button className="flex flex-col items-center justify-center hover:bg-black/5 px-2 py-1 rounded gap-1">
          <span className="text-xl">🔄</span>
          <span className="text-[10px]">Refresh</span>
        </button>
        <button 
          onClick={() => setUrl('https://portfolio.com/about-me')}
          className="flex flex-col items-center justify-center hover:bg-black/5 px-2 py-1 rounded gap-1"
        >
          <span className="text-xl">🏠</span>
          <span className="text-[10px]">Home</span>
        </button>
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-2 px-2 py-1 bg-[#ECE9D8] border-b border-[#D5D5D5] text-sm">
        <span className="text-gray-500">Address</span>
        <div className="flex-1 flex border border-[#7F9DB9] bg-white shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
          <div className="bg-[#ECE9D8] px-1 flex items-center border-r border-[#7F9DB9]">🌐</div>
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-2 py-1 outline-none text-black"
          />
        </div>
        <button className="flex items-center gap-1 hover:bg-black/5 px-2 py-1 rounded">
          <span>➡️</span> Go
        </button>
      </div>

      {/* Bookmarks bar */}
      <div className="flex gap-2 px-2 py-1 bg-[#ECE9D8] text-xs border-b border-[#D5D5D5]">
        <span className="text-gray-500">Links</span>
        <button onClick={() => setUrl('https://portfolio.com/about-me')} className="hover:underline flex items-center gap-1"><span>⭐</span> About Me</button>
        <button onClick={() => setUrl(profile.github)} className="hover:underline flex items-center gap-1"><span>⭐</span> GitHub</button>
        <button onClick={() => setUrl(profile.linkedin)} className="hover:underline flex items-center gap-1"><span>⭐</span> LinkedIn</button>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white overflow-auto border-t-[3px] border-b-[3px] border-white select-text">
        {pages[url] || (
          <div className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">The page cannot be displayed</h1>
            <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
          </div>
        )}
      </div>
    </div>
  );
};
