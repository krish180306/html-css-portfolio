import React, { useState } from 'react';
import { useStore } from '../store';

type ViewState = 'root' | 'projects' | 'documents' | 'shared' | 'c_drive';

const PROJECTS_DATA = {
  scriptops: {
    title: 'ScriptOps - Notepad',
    desc: `PROJECT: ScriptOps — AI-Powered Film Production Assistant (Hackathon Winner)

DESCRIPTION:
Built a full-stack AI-powered application in a 24-hour hackathon that won first place by automating film pre-production analysis.

TECH STACK:
- Backend: Python, FastAPI
- Frontend: React, Recharts
- AI: Google Gemini Pro API

KEY FEATURES:
- Automated screenplay parsing and scene breakdowns
- Character analysis, emotion tracking, and screen-time estimation
- Interactive visual dashboards mapping budget, prop allocation, and scheduling timelines`
  },
  field2site: {
    title: 'Field2Site - Notepad',
    desc: `PROJECT: Field2Site — Equipment Rental Marketplace

DESCRIPTION:
Developed a full-stack equipment rental marketplace facilitating transactions between construction firms and suppliers.

TECH STACK:
- Backend: Node.js, Express.js
- Frontend: React, Tailwind CSS, Vite
- Database: MySQL
- Authentication: OTP-based secure email verification via Nodemailer

KEY FEATURES:
- Real-time catalog search and dynamic pricing calculation
- Multi-tier user roles (Customer, Supplier, Admin)
- Booking schedules and invoice generation pipelines`
  },
  visionassist: {
    title: 'VisionAssist - Notepad',
    desc: `PROJECT: VisionAssist — CNN-Based Assistive Face Recognition System

DESCRIPTION:
Developed a deep-learning face recognition system to assist visually impaired individuals in recognizing family members and familiar people.

TECH STACK:
- AI/ML: PyTorch, OpenCV, NumPy, Scikit-learn
- Pipeline: CNN-based feature extraction and classification

KEY FEATURES:
- Real-time face tracking and cropping from camera feeds
- Voice feedback synthesis mapping recognized faces to auditory cues
- Low-latency processing suitable for edge devices`
  },
  dwdm: {
    title: 'Research_DWDM - Notepad',
    desc: `RESEARCH PROJECT: Deep Learning Prediction for Photonic Crystal DWDM Demultiplexer

DESCRIPTION:
Developed a deep learning based regression model to predict structural and performance parameters of a 2D photonic crystal DWDM demultiplexer using FDTD simulation datasets.

PUBLICATIONS:
- Published research paper at Sixth International Conference on Optical & Wireless Technologies (OWT2025).

TECH STACK:
- Python, TensorFlow/Keras, Scikit-learn, NumPy, Pandas, Matplotlib

KEY FEATURES:
- Trained neural network regression model estimating demographic device metrics
- Realized Mean Squared Error (MSE) < 0.01 with R2 score > 0.98 on predicted parameters
- Significantly accelerated photonic demultiplexer device optimization from hours to milliseconds`
  }
};

const RESUME_TEXT = `P SAI KRISHNAN
+91 8368836251 | sai.krish6081@gmail.com | Chennai, Tamil Nadu
LinkedIn: linkedin.com/in/p-sai-krishnan | GitHub: github.com/krish180306

OBJECTIVE
Computer Science undergraduate at Vellore Institute of Technology with interests in machine learning and full-stack web development. Passionate about building intelligent data-driven applications and scalable web platforms while gaining hands-on experience in real-world software development.

EDUCATION
B.Tech in Computer Science and Engineering, Vellore Institute of Technology, Chennai
Expected 2028 | CGPA: 8.03

SKILLS
Languages: Python, HTML, CSS, C, C++, JavaScript, Java
Frameworks/Libraries: React, Vite, Node.js, Express, Scikit-learn, Tensorflow, PyTorch, NumPy, Pandas
Tools/Platforms: Git, GitHub, Google Colab
Databases: MySQL, SQL*Plus, MongoDB

RESEARCH EXPERIENCE
Deep Learning Prediction for Photonic Crystal DWDM Demultiplexer (Aug 2025 - Dec 2025)
- Developed a deep learning based regression model to predict structural and performance parameters of a 2D photonic crystal DWDM demultiplexer using FDTD simulation datasets.
- Trained machine learning models using Python libraries such as Scikit-learn and NumPy to estimate photonic device design parameters.
- Evaluated model performance using Mean Squared Error (MSE) and R2 score to assess prediction accuracy.

PROJECTS
ScriptOps — AI-Powered Film Production Assistant (Hackathon Winning Project)
- Built a full-stack AI-powered application in a 24-hour hackathon that won first place by automating film pre-production analysis.
- Developed backend services using Python and FastAPI.
- Designed interactive dashboards using React and Recharts.

Field2Site — Equipment Rental Marketplace
- Developed a full-stack equipment rental marketplace using React (Vite), Node.js/Express, and MySQL.
- Implemented OTP-based authentication using Nodemailer.

VisionAssist — CNN-Based Assistive Face Recognition System
- Developed a CNN-based face recognition model using PyTorch and OpenCV.
- Built an end-to-end assistive vision pipeline.

ACHIEVEMENTS & CERTIFICATIONS
- 2x Hackathon Winner
- Published research paper at Sixth International Conference on Optical & Wireless Technologies (OWT2025).
- Quantitative Research Virtual Experience — JPMorgan Chase & Co., Forage (Feb 2025)`;

const GUEST_WELCOME_TEXT = `Welcome, Guest!

This is a temporary Guest session. Any files you edit or create in Notepad or drawings you save in Paint are stored in memory or local storage.

Enjoy exploring the portfolio!`;

export const MyComputer: React.FC<{ initialView?: ViewState }> = ({ initialView = 'root' }) => {
  const { openWindow, currentUser } = useStore();
  const [currentView, setCurrentView] = useState<ViewState>(initialView);
  const [history, setHistory] = useState<ViewState[]>([initialView]);

  const navigateTo = (view: ViewState) => {
    setHistory(prev => [...prev, view]);
    setCurrentView(view);
  };

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setCurrentView(newHistory[newHistory.length - 1]);
    }
  };

  const getAddressText = () => {
    switch (currentView) {
      case 'root':
        return 'My Computer';
      case 'projects':
        return 'My Computer \\ Projects (D:)';
      case 'documents':
        return `My Computer \\ ${currentUser}'s Documents`;
      case 'shared':
        return 'My Computer \\ Shared Documents';
      case 'c_drive':
        return 'My Computer \\ Local Disk (C:)';
    }
  };

  const getAddressIcon = () => {
    switch (currentView) {
      case 'root':
        return '💻';
      case 'projects':
      case 'c_drive':
        return '💽';
      case 'documents':
      case 'shared':
        return '📁';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white select-none text-black font-sans">
      {/* Top Bar / Menu */}
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
        <button 
          onClick={handleBack}
          disabled={history.length <= 1}
          className="flex items-center gap-1 hover:bg-black/5 active:bg-black/10 px-2 py-1 rounded disabled:opacity-40 disabled:hover:bg-transparent text-xs text-black border-none bg-transparent"
        >
          <span className="text-sm">⬅️</span> Back
        </button>
        <button 
          disabled
          className="flex items-center gap-1 opacity-30 px-2 py-1 rounded text-xs text-black border-none bg-transparent"
        >
          <span className="text-sm">➡️</span>
        </button>
        <div className="w-px h-6 bg-black/20 mx-1"></div>
        <button className="flex items-center gap-1 hover:bg-black/5 px-2 py-1 rounded text-xs text-black border-none bg-transparent">
          <span className="text-sm">🔍</span> Search
        </button>
        <button className="flex items-center gap-1 hover:bg-black/5 px-2 py-1 rounded text-xs text-black border-none bg-transparent">
          <span className="text-sm">📁</span> Folders
        </button>
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-2 px-2 py-1 bg-[#ECE9D8] border-b border-[#D5D5D5] text-xs">
        <span className="text-gray-500 pl-1">Address</span>
        <div className="flex-1 bg-white border border-[#7F9DB9] px-2 py-1 flex items-center gap-2 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)] h-6 select-all">
          <span className="text-sm">{getAddressIcon()}</span> 
          <span className="font-sans leading-none">{getAddressText()}</span>
        </div>
        <button 
          onClick={handleBack}
          disabled={history.length <= 1}
          className="flex items-center gap-1 hover:bg-black/5 px-2 py-[2px] rounded text-xs border border-gray-400 bg-white font-medium active:bg-gray-100 disabled:opacity-50"
        >
          <span>➡️</span> <span className="pr-1">Go</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-48 bg-gradient-to-b from-[#7BA2E7] to-[#6375D6] p-3 text-white overflow-y-auto border-r border-[#D5D5D5] flex-shrink-0">
          <div className="bg-white/10 rounded-t-lg p-2 font-bold flex justify-between items-center text-[#00138C] bg-gradient-to-r from-white to-[#D3E5FA] text-xs shadow-sm">
            System Tasks
            <span>🔼</span>
          </div>
          <div className="bg-[#6375D6]/30 p-2 pb-4 text-[11px] flex flex-col gap-2 rounded-b-lg border-t border-[#A6C6EF]/40 shadow-inner">
            <span 
              className="flex items-center gap-2 hover:underline cursor-pointer text-blue-100"
              onClick={() => openWindow('resume', 'Resume.txt - Notepad', '📝', 'notepad', { initialText: RESUME_TEXT })}
            >
              <span>📄</span> View resume details
            </span>
            <span 
              className="flex items-center gap-2 hover:underline cursor-pointer text-blue-100"
              onClick={() => openWindow('paint', 'Paint', '🎨', 'paint')}
            >
              <span>🎨</span> Open Paint program
            </span>
            <span 
              className="flex items-center gap-2 hover:underline cursor-pointer text-blue-100"
              onClick={() => navigateTo('root')}
            >
              <span>💻</span> Go to My Computer
            </span>
          </div>
        </div>

        {/* Right Panel (Icons) */}
        <div className="flex-1 bg-white p-4 overflow-y-auto font-sans">
          
          {/* VIEW: ROOT / MY COMPUTER */}
          {currentView === 'root' && (
            <>
              <div className="text-xs font-bold border-b border-[#D5D5D5] pb-1 mb-4 flex items-center gap-2 text-[#00138C]">
                Files Stored on This Computer
              </div>
              <div className="flex flex-wrap gap-6 px-2 mb-8">
                <div 
                  onDoubleClick={() => navigateTo('shared')}
                  className="flex items-center gap-3 cursor-pointer w-52 hover:bg-blue-500/10 p-1.5 rounded group select-none border border-transparent hover:border-[#7F9DB9]"
                >
                  <span className="text-3xl select-none group-hover:scale-105 transition-transform">📁</span>
                  <div className="flex flex-col text-xs">
                    <span className="font-medium text-black">Shared Documents</span>
                  </div>
                </div>
                <div 
                  onDoubleClick={() => navigateTo('documents')}
                  className="flex items-center gap-3 cursor-pointer w-52 hover:bg-blue-500/10 p-1.5 rounded group select-none border border-transparent hover:border-[#7F9DB9]"
                >
                  <span className="text-3xl select-none group-hover:scale-105 transition-transform">📁</span>
                  <div className="flex flex-col text-xs">
                    <span className="font-medium text-black">{currentUser}'s Documents</span>
                  </div>
                </div>
              </div>

              <div className="text-xs font-bold border-b border-[#D5D5D5] pb-1 mb-4 flex items-center gap-2 text-[#00138C]">
                Hard Disk Drives
              </div>
              <div className="flex flex-wrap gap-6 px-2">
                <div 
                  onDoubleClick={() => navigateTo('c_drive')}
                  className="flex items-center gap-3 cursor-pointer w-52 hover:bg-blue-500/10 p-1.5 rounded group select-none border border-transparent hover:border-[#7F9DB9]"
                >
                  <span className="text-3xl select-none group-hover:scale-105 transition-transform">💽</span>
                  <div className="flex flex-col text-xs">
                    <span className="font-medium text-black">Local Disk (C:)</span>
                  </div>
                </div>
                <div 
                  onDoubleClick={() => navigateTo('projects')}
                  className="flex items-center gap-3 cursor-pointer w-52 hover:bg-blue-500/10 p-1.5 rounded group select-none border border-transparent hover:border-[#7F9DB9]"
                >
                  <span className="text-3xl select-none group-hover:scale-105 transition-transform">💽</span>
                  <div className="flex flex-col text-xs">
                    <span className="font-medium text-black font-bold">Projects (D:)</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* VIEW: PROJECTS (D:) */}
          {currentView === 'projects' && (
            <>
              <div className="text-xs font-bold border-b border-[#D5D5D5] pb-1 mb-4 flex items-center gap-2 text-[#00138C]">
                Folders in Projects (D:) — <span className="font-normal text-gray-500 italic">Double-click to open description file</span>
              </div>
              <div className="flex flex-wrap gap-6 px-2">
                <div 
                  onDoubleClick={() => openWindow('notepad_scriptops', 'ScriptOps - Notepad', '📝', 'notepad', { initialText: PROJECTS_DATA.scriptops.desc })}
                  className="flex items-center gap-3 cursor-pointer w-52 hover:bg-blue-500/10 p-1.5 rounded group select-none border border-transparent hover:border-[#7F9DB9]"
                >
                  <span className="text-3xl select-none group-hover:scale-105 transition-transform">📁</span>
                  <div className="flex flex-col text-xs">
                    <span className="font-medium text-black">ScriptOps</span>
                  </div>
                </div>
                <div 
                  onDoubleClick={() => openWindow('notepad_field2site', 'Field2Site - Notepad', '📝', 'notepad', { initialText: PROJECTS_DATA.field2site.desc })}
                  className="flex items-center gap-3 cursor-pointer w-52 hover:bg-blue-500/10 p-1.5 rounded group select-none border border-transparent hover:border-[#7F9DB9]"
                >
                  <span className="text-3xl select-none group-hover:scale-105 transition-transform">📁</span>
                  <div className="flex flex-col text-xs">
                    <span className="font-medium text-black">Field2Site</span>
                  </div>
                </div>
                <div 
                  onDoubleClick={() => openWindow('notepad_visionassist', 'VisionAssist - Notepad', '📝', 'notepad', { initialText: PROJECTS_DATA.visionassist.desc })}
                  className="flex items-center gap-3 cursor-pointer w-52 hover:bg-blue-500/10 p-1.5 rounded group select-none border border-transparent hover:border-[#7F9DB9]"
                >
                  <span className="text-3xl select-none group-hover:scale-105 transition-transform">📁</span>
                  <div className="flex flex-col text-xs">
                    <span className="font-medium text-black">VisionAssist</span>
                  </div>
                </div>
                <div 
                  onDoubleClick={() => openWindow('notepad_dwdm', 'Research_DWDM - Notepad', '📝', 'notepad', { initialText: PROJECTS_DATA.dwdm.desc })}
                  className="flex items-center gap-3 cursor-pointer w-52 hover:bg-blue-500/10 p-1.5 rounded group select-none border border-transparent hover:border-[#7F9DB9]"
                >
                  <span className="text-3xl select-none group-hover:scale-105 transition-transform">📁</span>
                  <div className="flex flex-col text-xs">
                    <span className="font-medium text-black">Research_DWDM</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* VIEW: DOCUMENTS */}
          {currentView === 'documents' && (
            <>
              <div className="text-xs font-bold border-b border-[#D5D5D5] pb-1 mb-4 flex items-center gap-2 text-[#00138C]">
                Files in {currentUser}'s Documents
              </div>
              <div className="flex flex-wrap gap-6 px-2">
                {currentUser === 'Sai Krishnan' ? (
                  <div 
                    onDoubleClick={() => openWindow('resume', 'Resume.txt - Notepad', '📝', 'notepad', { initialText: RESUME_TEXT })}
                    className="flex items-center gap-3 cursor-pointer w-52 hover:bg-blue-500/10 p-1.5 rounded group select-none border border-transparent hover:border-[#7F9DB9]"
                  >
                    <span className="text-3xl select-none group-hover:scale-105 transition-transform">📄</span>
                    <div className="flex flex-col text-xs">
                      <span className="font-medium text-black">Resume.txt</span>
                    </div>
                  </div>
                ) : (
                  <div 
                    onDoubleClick={() => openWindow('welcome_guest', 'welcome_guest.txt - Notepad', '📝', 'notepad', { initialText: GUEST_WELCOME_TEXT })}
                    className="flex items-center gap-3 cursor-pointer w-52 hover:bg-blue-500/10 p-1.5 rounded group select-none border border-transparent hover:border-[#7F9DB9]"
                  >
                    <span className="text-3xl select-none group-hover:scale-105 transition-transform">📄</span>
                    <div className="flex flex-col text-xs">
                      <span className="font-medium text-black">welcome_guest.txt</span>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* VIEW: SHARED DOCUMENTS */}
          {currentView === 'shared' && (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500 text-xs">
              <span className="text-4xl mb-2 select-none">📁</span>
              <span>This folder is empty.</span>
            </div>
          )}

          {/* VIEW: LOCAL DISK (C:) */}
          {currentView === 'c_drive' && (
            <>
              <div className="text-xs font-bold border-b border-[#D5D5D5] pb-1 mb-4 flex items-center gap-2 text-[#00138C]">
                Folders in Local Disk (C:)
              </div>
              <div className="flex flex-wrap gap-6 px-2">
                <div className="flex items-center gap-3 cursor-not-allowed opacity-60 w-52 p-1.5 border border-transparent select-none">
                  <span className="text-3xl select-none">📁</span>
                  <div className="flex flex-col text-xs">
                    <span className="font-medium text-black">Windows</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 cursor-not-allowed opacity-60 w-52 p-1.5 border border-transparent select-none">
                  <span className="text-3xl select-none">📁</span>
                  <div className="flex flex-col text-xs">
                    <span className="font-medium text-black">Program Files</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 cursor-not-allowed opacity-60 w-52 p-1.5 border border-transparent select-none">
                  <span className="text-3xl select-none">📁</span>
                  <div className="flex flex-col text-xs">
                    <span className="font-medium text-black">Documents and Settings</span>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
