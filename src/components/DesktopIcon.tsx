import React, { useState } from 'react';
import { useMobile } from '../hooks/useMobile';

interface DesktopIconProps {
  title: string;
  icon: string;
  onDoubleClick: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ title, icon, onDoubleClick }) => {
  const [selected, setSelected] = useState(false);
  const isMobile = useMobile();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMobile) {
      // Single tap opens on mobile
      onDoubleClick();
    } else {
      setSelected(true);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(false);
    onDoubleClick();
  };

  return (
    <div
      className={`flex flex-col items-center gap-1 p-2 cursor-pointer select-none border border-transparent rounded-[2px]
        ${isMobile ? 'w-24' : 'w-20'}
        ${selected ? 'bg-blue-500/50 border-blue-200/50' : 'hover:bg-blue-500/20 hover:border-blue-200/30'}
      `}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className={`drop-shadow-md ${isMobile ? 'text-5xl' : 'text-4xl'}`}>{icon}</div>
      <span className={`text-white font-medium text-center leading-tight [text-shadow:1px_1px_2px_#000,0_0_1em_#000,0_0_0.2em_#000] ${isMobile ? 'text-sm' : 'text-xs'}`}>
        {title}
      </span>
    </div>
  );
};
