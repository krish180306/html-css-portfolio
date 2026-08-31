import React, { useState } from 'react';
import { useMobile } from '../hooks/useMobile';

interface DesktopIconProps {
  title: string;
  icon: string;
  onDoubleClick: () => void;
  /** Absolute desktop position — when provided, the icon renders as freely draggable. */
  position?: { x: number; y: number };
  onPositionChange?: (x: number, y: number) => void;
  draggable?: boolean;
  onContextMenu?: (e: React.MouseEvent) => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  title,
  icon,
  onDoubleClick,
  position,
  onPositionChange,
  draggable,
  onContextMenu,
}) => {
  const [selected, setSelected] = useState(false);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const isMobile = useMobile();
  const isDraggable = draggable && !!position && !!onPositionChange;

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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isDraggable || !position) return;
    e.stopPropagation();
    setSelected(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const origX = position.x;
    const origY = position.y;
    let latest = { x: origX, y: origY };

    const onMove = (ev: MouseEvent) => {
      latest = {
        x: Math.max(0, origX + (ev.clientX - startX)),
        y: Math.max(0, origY + (ev.clientY - startY)),
      };
      setDragPos(latest);
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      onPositionChange?.(latest.x, latest.y);
      setDragPos(null);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const renderedPos = dragPos ?? position;

  return (
    <div
      className={`flex flex-col items-center gap-1 p-2 select-none border border-transparent rounded-[2px]
        ${isDraggable ? 'absolute cursor-grab active:cursor-grabbing' : 'cursor-pointer'}
        ${isMobile ? 'w-24' : 'w-20'}
        ${selected ? 'bg-blue-500/50 border-blue-200/50' : 'hover:bg-blue-500/20 hover:border-blue-200/30'}
      `}
      style={isDraggable && renderedPos ? { left: renderedPos.x, top: renderedPos.y, zIndex: dragPos ? 10 : undefined } : undefined}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      onContextMenu={(e) => {
        if (!onContextMenu) return;
        e.preventDefault();
        e.stopPropagation();
        setSelected(true);
        onContextMenu(e);
      }}
    >
      <div className={`drop-shadow-md ${isMobile ? 'text-5xl' : 'text-4xl'}`}>{icon}</div>
      <span className={`text-white font-medium text-center leading-tight [text-shadow:1px_1px_2px_#000,0_0_1em_#000,0_0_0.2em_#000] ${isMobile ? 'text-sm' : 'text-xs'}`}>
        {title}
      </span>
    </div>
  );
};
