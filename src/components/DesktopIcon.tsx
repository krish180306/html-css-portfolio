import React, { useState } from 'react';

interface DesktopIconProps {
  title: string;
  icon: string;
  onDoubleClick: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ title, icon, onDoubleClick }) => {
  const [selected, setSelected] = useState(false);

  return (
    <div 
      className={`w-20 flex flex-col items-center gap-1 p-1 cursor-pointer select-none border border-transparent rounded-[2px] ${selected ? 'bg-blue-500/50 border-blue-200/50' : 'hover:bg-blue-500/20 hover:border-blue-200/30'}`}
      onClick={(e) => {
        e.stopPropagation();
        setSelected(true);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        setSelected(false);
        onDoubleClick();
      }}
    >
      <div className="text-4xl drop-shadow-md">{icon}</div>
      <span className="text-white text-xs font-medium text-center leading-tight [text-shadow:1px_1px_2px_#000,0_0_1em_#000,0_0_0.2em_#000]">
        {title}
      </span>
    </div>
  );
};
