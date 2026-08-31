import React, { useState } from 'react';
import { profile } from '../data/profile';

export const ContactMe: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent(subject || 'Hello!')}&body=${encodeURIComponent(message)}`;

  return (
    <div className="flex flex-col h-full bg-[#ECE9D8] select-none text-black font-sans">
      {/* Menu bar — Outlook Express style */}
      <div className="flex gap-4 px-2 py-1 bg-[#ECE9D8] text-xs border-b border-[#D5D5D5]">
        <span className="hover:bg-blue-500 hover:text-white px-1 cursor-pointer">File</span>
        <span className="hover:bg-blue-500 hover:text-white px-1 cursor-pointer">Edit</span>
        <span className="hover:bg-blue-500 hover:text-white px-1 cursor-pointer">Insert</span>
        <span className="hover:bg-blue-500 hover:text-white px-1 cursor-pointer">Format</span>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-2 py-2 bg-[#ECE9D8] border-b border-[#D5D5D5]">
        <a
          href={mailtoHref}
          className="flex items-center gap-1.5 bg-white border border-[#7F9DB9] rounded px-3 py-1 text-xs font-bold text-[#00138C] hover:bg-blue-50 shadow-sm"
        >
          ✉️ Send
        </a>
      </div>

      {/* Header fields */}
      <div className="bg-white border-b border-[#D5D5D5]">
        <div className="flex items-center border-b border-[#EEEEEE] px-3 py-1.5 text-xs">
          <span className="w-16 text-gray-500">To:</span>
          <span className="font-medium">{profile.name} &lt;{profile.email}&gt;</span>
        </div>
        <div className="flex items-center border-b border-[#EEEEEE] px-3 py-1.5 text-xs">
          <span className="w-16 text-gray-500">Subject:</span>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="What's this about?"
            className="flex-1 outline-none text-sm py-0.5"
          />
        </div>
      </div>

      {/* Body */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={`Hi ${profile.name.split(' ')[0]},\n\nI'd like to get in touch about...`}
        className="flex-1 p-3 text-sm outline-none resize-none font-sans"
      />

      {/* Footer: direct links */}
      <div className="flex items-center gap-4 px-3 py-2 bg-[#F1F0E8] border-t border-[#D5D5D5] text-xs">
        <span className="text-gray-500">Or reach me directly:</span>
        <a href={`mailto:${profile.email}`} className="text-blue-700 hover:underline">{profile.email}</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">LinkedIn</a>
        <a href={profile.github} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">GitHub</a>
      </div>
    </div>
  );
};
