import React, { useEffect } from 'react';
import { useStore } from '../store';
import { DesktopIcon } from './DesktopIcon';
import wallpaper from '../assets/wallpaper.jpg';

export const Desktop: React.FC = () => {
  const { closeStartMenu, openWindow } = useStore();

  // Handle clicking on empty desktop to deselect icons
  useEffect(() => {
    const handleGlobalClick = () => {
      // You could add logic here to clear selected icon states if you put that state in store
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <div 
      className="w-screen h-screen bg-cover bg-center overflow-hidden flex flex-col relative"
      style={{ backgroundImage: `url(${wallpaper})` }}
      onClick={closeStartMenu}
    >
      <div className="flex-1 relative z-0 p-2 flex flex-col flex-wrap content-start gap-4 h-full pt-4">
        <DesktopIcon 
          title="My Computer" 
          icon="💻" 
          onDoubleClick={() => openWindow('mycomputer', 'My Computer', '💻', 'mycomputer', { initialView: 'root' })} 
        />
        <DesktopIcon 
          title="My Documents" 
          icon="📁" 
          onDoubleClick={() => openWindow('mydocuments', 'My Documents', '📁', 'mycomputer', { initialView: 'documents' })} 
        />
        <DesktopIcon 
          title="Internet Explorer" 
          icon="🌐" 
          onDoubleClick={() => openWindow('ie', 'Internet Explorer', '🌐', 'ie')} 
        />
        <DesktopIcon 
          title="Recycle Bin" 
          icon="🗑️" 
          onDoubleClick={() => openWindow('recyclebin', 'Recycle Bin', '🗑️', 'mycomputer')} 
        />
        <DesktopIcon 
          title="Notepad" 
          icon="📝" 
          onDoubleClick={() => openWindow('notepad', 'Notepad', '📝', 'notepad')} 
        />
        <DesktopIcon 
          title="Resume.txt" 
          icon="📄" 
          onDoubleClick={() => openWindow('resume', 'Resume.txt - Notepad', '📝', 'notepad', {
            initialText: `P SAI KRISHNAN
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
- Quantitative Research Virtual Experience — JPMorgan Chase & Co., Forage (Feb 2025)`
          })} 
        />
      </div>

      {/* <StartMenu /> */}
      {/* <Taskbar /> */}
    </div>
  );
};
