import { create } from 'zustand';

export type SystemState = 'off' | 'booting' | 'welcome' | 'running' | 'shutting_down';
export type CurrentUser = 'Sai Krishnan' | 'Guest';

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  appType: string;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  appProps?: any;
}

interface DesktopStore {
  systemState: SystemState;
  currentUser: CurrentUser;
  setSystemState: (state: SystemState) => void;
  setCurrentUser: (user: CurrentUser) => void;
  startMenuOpen: boolean;
  toggleStartMenu: () => void;
  closeStartMenu: () => void;
  windows: WindowState[];
  activeWindowId: string | null;
  openWindow: (id: string, title: string, icon: string, appType: string, appProps?: any) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
}

let nextZIndex = 10;

export const useStore = create<DesktopStore>((set) => ({
  systemState: 'booting',
  currentUser: 'Sai Krishnan',
  setSystemState: (systemState) => {
    if (systemState === 'welcome' || systemState === 'shutting_down') {
      set({ systemState, windows: [], activeWindowId: null, startMenuOpen: false });
    } else {
      set({ systemState });
    }
  },
  setCurrentUser: (currentUser) => set({ currentUser }),

  startMenuOpen: false,
  toggleStartMenu: () => set((state) => ({ startMenuOpen: !state.startMenuOpen })),
  closeStartMenu: () => set({ startMenuOpen: false }),
  
  windows: [],
  activeWindowId: null,
  
  openWindow: (id, title, icon, appType, appProps) => {
    set((state) => {
      const existing = state.windows.find(w => w.id === id);
      if (existing) {
        return {
          windows: state.windows.map(w => 
            w.id === id ? { ...w, minimized: false, zIndex: nextZIndex++ } : w
          ),
          activeWindowId: id,
          startMenuOpen: false
        };
      }
      
      return {
        windows: [...state.windows, {
          id,
          title,
          icon,
          appType,
          minimized: false,
          maximized: false,
          zIndex: nextZIndex++,
          appProps
        }],
        activeWindowId: id,
        startMenuOpen: false
      };
    });
  },
  
  closeWindow: (id) => {
    set((state) => {
      const newWindows = state.windows.filter(w => w.id !== id);
      const activeWindowId = state.activeWindowId === id 
        ? (newWindows.length > 0 ? newWindows[newWindows.length - 1].id : null) 
        : state.activeWindowId;
      return { windows: newWindows, activeWindowId };
    });
  },
  
  minimizeWindow: (id) => {
    set((state) => {
      const newWindows = state.windows.map(w => 
        w.id === id ? { ...w, minimized: true } : w
      );
      const activeWindowId = state.activeWindowId === id ? null : state.activeWindowId;
      return { windows: newWindows, activeWindowId };
    });
  },

  maximizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map(w => 
        w.id === id ? { ...w, maximized: !w.maximized } : w
      )
    }));
  },
  
  focusWindow: (id) => {
    set((state) => {
      const existing = state.windows.find(w => w.id === id);
      if (!existing || existing.zIndex === nextZIndex - 1) {
        return { activeWindowId: id };
      }
      
      return {
        windows: state.windows.map(w => 
          w.id === id ? { ...w, zIndex: nextZIndex++, minimized: false } : w
        ),
        activeWindowId: id,
        startMenuOpen: false
      };
    });
  }
}));
