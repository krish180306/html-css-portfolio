import React, { useState, useRef, useEffect } from 'react';

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>(['Microsoft Windows XP [Version 5.1.2600]', '(C) Copyright 1985-2001 Microsoft Corp.', '']);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, `C:\\Documents and Settings\\Sai_Krishnan>${input}`];
      
      switch (cmd) {
        case 'help':
          newHistory.push('Available commands:');
          newHistory.push('  help     - Show this help message');
          newHistory.push('  whoami   - Display information about the current user');
          newHistory.push('  projects - List all projects');
          newHistory.push('  skills   - List technical skills');
          newHistory.push('  clear    - Clear the terminal screen');
          break;
        case 'whoami':
          newHistory.push('P Sai Krishnan');
          newHistory.push('Computer Science Undergraduate at Vellore Institute of Technology');
          break;
        case 'projects':
          newHistory.push('1. ScriptOps - AI-Powered Film Production Assistant (Hackathon Winner)');
          newHistory.push('2. Field2Site - Equipment Rental Marketplace (React/Node.js/MySQL)');
          newHistory.push('3. VisionAssist - CNN-Based Assistive Face Recognition System (PyTorch/OpenCV)');
          newHistory.push('4. DWDM Demultiplexer Research - Deep Learning Regression Model');
          break;
        case 'skills':
          newHistory.push('Languages: Python, HTML, CSS, C, C++, JavaScript, Java');
          newHistory.push('Frameworks/Libraries: React, Vite, Node.js, Express, Scikit-learn, Tensorflow, PyTorch, NumPy, Pandas');
          newHistory.push('Tools/Platforms: Git, GitHub, Google Colab');
          newHistory.push('Databases: MySQL, SQL*Plus, MongoDB');
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case '':
          break;
        default:
          newHistory.push(`'${input}' is not recognized as an internal or external command,`);
          newHistory.push('operable program or batch file.');
      }
      
      newHistory.push(''); // Empty line after output
      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-black text-gray-300 font-mono text-[14px] p-2 overflow-auto select-text cursor-text" onClick={() => document.getElementById('cmd-input')?.focus()}>
      {history.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap leading-tight">{line}</div>
      ))}
      <div className="flex">
        <span className="mr-2">C:\Documents and Settings\Sai_Krishnan&gt;</span>
        <input
          id="cmd-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="flex-1 bg-transparent outline-none border-none text-gray-300 font-mono focus:ring-0"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>
      <div ref={endRef} />
    </div>
  );
};
