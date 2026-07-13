import React, { useState, useEffect } from 'react';

export const Notepad: React.FC<{ initialText?: string }> = ({ initialText }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (initialText) {
      setContent(initialText);
      return;
    }
    const saved = localStorage.getItem('notepad-content');
    if (saved) {
      setContent(saved);
    } else {
      setContent('Welcome to Notepad!\n\nThis is a simple text editor.\nYou can edit this text and it will be saved in your browser.');
    }
  }, [initialText]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    localStorage.setItem('notepad-content', e.target.value);
  };

  return (
    <div className="flex flex-col h-full bg-white font-sans text-black select-none">
      {/* Menu Bar */}
      <div className="flex gap-4 px-2 py-1 bg-[#ECE9D8] text-xs border-b border-[#D5D5D5]">
        <span className="hover:bg-blue-500 hover:text-white px-1 cursor-pointer">File</span>
        <span className="hover:bg-blue-500 hover:text-white px-1 cursor-pointer">Edit</span>
        <span className="hover:bg-blue-500 hover:text-white px-1 cursor-pointer">Format</span>
        <span className="hover:bg-blue-500 hover:text-white px-1 cursor-pointer">View</span>
        <span className="hover:bg-blue-500 hover:text-white px-1 cursor-pointer">Help</span>
      </div>

      {/* Editor Area */}
      <textarea
        value={content}
        onChange={handleChange}
        className="flex-1 w-full p-1 resize-none outline-none font-sans text-sm selection:bg-blue-500 selection:text-white"
        spellCheck={false}
      />
    </div>
  );
};
