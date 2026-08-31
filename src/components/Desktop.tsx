import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import { DesktopIcon } from './DesktopIcon';
import { ContextMenu } from './ContextMenu';
import { useMobile } from '../hooks/useMobile';
import wallpaper from '../assets/wallpaper.jpg';
import { resumeText } from '../data/profile';

const ROWS_PER_COLUMN = 6;
const COLUMN_WIDTH = 88;
const ROW_HEIGHT = 96;
const GRID_ORIGIN = { x: 16, y: 16 };

interface IconDef {
  key: string;
  title: string;
  icon: string;
  onDoubleClick: () => void;
}

type ContextTarget = { type: 'desktop' } | { type: 'icon'; def: IconDef };

export const Desktop: React.FC = () => {
  const { closeStartMenu, openWindow, iconPositions, setIconPosition, resetIconPositions } = useStore();
  const isMobile = useMobile();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; target: ContextTarget } | null>(null);

  useEffect(() => {
    const handleGlobalClick = () => {};
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  const icons: IconDef[] = [
    { key: 'About Me', title: 'About Me', icon: '🧑‍💻', onDoubleClick: () => openWindow('aboutme', 'About Me', '🧑‍💻', 'aboutme') },
    { key: 'My Projects', title: 'My Projects', icon: '🗂️', onDoubleClick: () => openWindow('myprojects', 'My Projects', '🗂️', 'myprojects') },
    { key: 'Contact Me', title: 'Contact Me', icon: '✉️', onDoubleClick: () => openWindow('contactme', 'Contact Me', '✉️', 'contactme') },
    { key: 'My Computer', title: 'My Computer', icon: '💻', onDoubleClick: () => openWindow('mycomputer', 'My Computer', '💻', 'mycomputer', { initialView: 'root' }) },
    { key: 'My Documents', title: 'My Documents', icon: '📁', onDoubleClick: () => openWindow('mydocuments', 'My Documents', '📁', 'mycomputer', { initialView: 'documents' }) },
    { key: 'Internet Explorer', title: 'Internet Explorer', icon: '🌐', onDoubleClick: () => openWindow('ie', 'Internet Explorer', '🌐', 'ie') },
    { key: 'Recycle Bin', title: 'Recycle Bin', icon: '🗑️', onDoubleClick: () => openWindow('recyclebin', 'Recycle Bin', '🗑️', 'mycomputer') },
    { key: 'Notepad', title: 'Notepad', icon: '📝', onDoubleClick: () => openWindow('notepad', 'Notepad', '📝', 'notepad') },
    { key: 'Resume.txt', title: 'Resume.txt', icon: '📄', onDoubleClick: () => openWindow('resume', 'Resume.txt - Notepad', '📝', 'notepad', { initialText: resumeText }) },
  ];

  const desktopMenuItems = [
    { label: 'Line Up Icons', onClick: () => resetIconPositions() },
    { label: 'Refresh', onClick: () => resetIconPositions() },
    { label: '', divider: true },
    { label: 'Paste', disabled: true },
    { label: 'New', disabled: true },
    { label: '', divider: true },
    { label: 'Properties', disabled: true },
  ];

  const iconMenuItems = (def: IconDef) => [
    { label: 'Open', onClick: def.onDoubleClick },
    { label: '', divider: true },
    { label: 'Rename', disabled: true },
    { label: 'Delete', disabled: true },
    { label: '', divider: true },
    { label: 'Properties', disabled: true },
  ];

  return (
    <div
      className="w-screen h-screen bg-cover bg-center overflow-hidden flex flex-col relative"
      style={{ backgroundImage: `url(${wallpaper})` }}
      onClick={closeStartMenu}
      onContextMenu={(e) => {
        if (isMobile) return;
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY, target: { type: 'desktop' } });
      }}
    >
      {isMobile ? (
        <div className="flex-1 relative z-0 p-3 grid grid-cols-3 content-start gap-4 pt-6">
          {icons.map((def) => (
            <DesktopIcon key={def.key} title={def.title} icon={def.icon} onDoubleClick={def.onDoubleClick} />
          ))}
        </div>
      ) : (
        <div className="flex-1 relative z-0">
          {icons.map((def, index) => {
            const col = Math.floor(index / ROWS_PER_COLUMN);
            const row = index % ROWS_PER_COLUMN;
            const defaultPos = {
              x: GRID_ORIGIN.x + col * COLUMN_WIDTH,
              y: GRID_ORIGIN.y + row * ROW_HEIGHT,
            };
            return (
              <DesktopIcon
                key={def.key}
                title={def.title}
                icon={def.icon}
                onDoubleClick={def.onDoubleClick}
                draggable
                position={iconPositions[def.key] ?? defaultPos}
                onPositionChange={(x, y) => setIconPosition(def.key, { x, y })}
                onContextMenu={(e) => setContextMenu({ x: e.clientX, y: e.clientY, target: { type: 'icon', def } })}
              />
            );
          })}
        </div>
      )}

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          items={contextMenu.target.type === 'desktop' ? desktopMenuItems : iconMenuItems(contextMenu.target.def)}
        />
      )}
    </div>
  );
};
