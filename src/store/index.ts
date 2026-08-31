import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  x: number;
  y: number;
  width: number;
  height: number;
  appProps?: any;
}

export interface IconPosition {
  x: number;
  y: number;
}

interface DesktopStore {
  systemState: SystemState;
  currentUser: CurrentUser;
  setSystemState: (state: SystemState) => void;
  setCurrentUser: (user: CurrentUser) => void;
  logOff: () => void;
  startMenuOpen: boolean;
  toggleStartMenu: () => void;
  closeStartMenu: () => void;
  crtEnabled: boolean;
  toggleCrt: () => void;
  windows: WindowState[];
  activeWindowId: string | null;
  openWindow: (id: string, title: string, icon: string, appType: string, appProps?: any) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, x: number, y: number, width: number, height: number) => void;
  snapWindow: (id: string, region: 'left' | 'right' | 'maximize') => void;
  iconPositions: Record<string, IconPosition>;
  setIconPosition: (key: string, pos: IconPosition) => void;
  resetIconPositions: () => void;
}

const nextZ = (windows: WindowState[]) =>
  windows.length === 0 ? 10 : Math.max(...windows.map((w) => w.zIndex)) + 1;

// Height of the desktop taskbar — used to keep Aero-snap regions clear of it.
export const TASKBAR_HEIGHT = 30;

export const useStore = create<DesktopStore>()(
  persist(
    (set) => ({
      systemState: 'booting',
      currentUser: 'Sai Krishnan',
      setSystemState: (systemState) => {
        // Shutting down ends the session — clear windows so the next boot starts fresh.
        // Reaching 'welcome' (via auto-boot or refresh) does NOT clear windows, so a
        // persisted session survives a page reload once the user logs back in.
        if (systemState === 'shutting_down') {
          set({ systemState, windows: [], activeWindowId: null, startMenuOpen: false });
        } else {
          set({ systemState });
        }
      },
      setCurrentUser: (currentUser) => set({ currentUser }),
      logOff: () => set({ systemState: 'welcome', windows: [], activeWindowId: null, startMenuOpen: false }),

      startMenuOpen: false,
      toggleStartMenu: () => set((state) => ({ startMenuOpen: !state.startMenuOpen })),
      closeStartMenu: () => set({ startMenuOpen: false }),

      crtEnabled: true,
      toggleCrt: () => set((state) => ({ crtEnabled: !state.crtEnabled })),

      windows: [],
      activeWindowId: null,

      openWindow: (id, title, icon, appType, appProps) => {
        set((state) => {
          const existing = state.windows.find((w) => w.id === id);
          if (existing) {
            return {
              windows: state.windows.map((w) =>
                w.id === id ? { ...w, minimized: false, zIndex: nextZ(state.windows) } : w
              ),
              activeWindowId: id,
              startMenuOpen: false,
            };
          }

          const z = nextZ(state.windows);
          const offset = (z * 15) % 200;
          return {
            windows: [
              ...state.windows,
              {
                id,
                title,
                icon,
                appType,
                minimized: false,
                maximized: false,
                zIndex: z,
                x: 50 + offset,
                y: 50 + offset,
                width: 600,
                height: 400,
                appProps,
              },
            ],
            activeWindowId: id,
            startMenuOpen: false,
          };
        });
      },

      closeWindow: (id) => {
        set((state) => {
          const newWindows = state.windows.filter((w) => w.id !== id);
          const activeWindowId =
            state.activeWindowId === id
              ? newWindows.length > 0
                ? newWindows[newWindows.length - 1].id
                : null
              : state.activeWindowId;
          return { windows: newWindows, activeWindowId };
        });
      },

      minimizeWindow: (id) => {
        set((state) => {
          const newWindows = state.windows.map((w) =>
            w.id === id ? { ...w, minimized: true } : w
          );
          const activeWindowId = state.activeWindowId === id ? null : state.activeWindowId;
          return { windows: newWindows, activeWindowId };
        });
      },

      maximizeWindow: (id) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, maximized: !w.maximized } : w
          ),
        }));
      },

      focusWindow: (id) => {
        set((state) => {
          const existing = state.windows.find((w) => w.id === id);
          if (!existing) return { activeWindowId: id };
          if (existing.zIndex === nextZ(state.windows) - 1) {
            return { activeWindowId: id, startMenuOpen: false };
          }

          return {
            windows: state.windows.map((w) =>
              w.id === id ? { ...w, zIndex: nextZ(state.windows), minimized: false } : w
            ),
            activeWindowId: id,
            startMenuOpen: false,
          };
        });
      },

      moveWindow: (id, x, y) => {
        set((state) => ({
          windows: state.windows.map((w) => (w.id === id ? { ...w, x, y } : w)),
        }));
      },

      resizeWindow: (id, x, y, width, height) => {
        set((state) => ({
          windows: state.windows.map((w) => (w.id === id ? { ...w, x, y, width, height } : w)),
        }));
      },

      snapWindow: (id, region) => {
        set((state) => {
          const vw = globalThis.innerWidth;
          const vh = globalThis.innerHeight - TASKBAR_HEIGHT;
          const half = Math.floor(vw / 2);
          return {
            windows: state.windows.map((w) => {
              if (w.id !== id) return w;
              if (region === 'maximize') return { ...w, maximized: true };
              return {
                ...w,
                maximized: false,
                x: region === 'left' ? 0 : half,
                y: 0,
                width: half,
                height: vh,
              };
            }),
          };
        });
      },

      iconPositions: {},
      setIconPosition: (key, pos) => {
        set((state) => ({ iconPositions: { ...state.iconPositions, [key]: pos } }));
      },
      resetIconPositions: () => set({ iconPositions: {} }),
    }),
    {
      name: 'xp-portfolio-store',
      partialize: (state) => ({
        currentUser: state.currentUser,
        crtEnabled: state.crtEnabled,
        windows: state.windows,
        iconPositions: state.iconPositions,
      }),
    }
  )
);
