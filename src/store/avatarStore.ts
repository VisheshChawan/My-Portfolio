import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface AvatarSettings {
  // Size per breakpoint
  desktopSize: number;
  tabletSize: number;
  mobileSize: number;

  // Shape
  shapePreset: 'circle' | 'rounded' | 'square';
  customRadius: number; // 0-50 as percentage

  // Border
  borderWidth: number; // 0-8

  // Effects
  glowIntensity: number; // 0-100
  shadowDepth: number; // 0-100
  rotation: number; // -45 to 45

  // Position offsets
  desktopX: number;
  desktopY: number;
  mobileX: number;
  mobileY: number;

  // Misc
  padding: number; // 0-20
  zIndex: number; // 1-100
  spinGlow: boolean;
}

export const defaultAvatarSettings: AvatarSettings = {
  desktopSize: 160,
  tabletSize: 140,
  mobileSize: 128,
  shapePreset: 'circle',
  customRadius: 50,
  borderWidth: 2,
  glowIntensity: 40,
  shadowDepth: 30,
  rotation: 0,
  desktopX: 0,
  desktopY: 0,
  mobileX: 0,
  mobileY: 0,
  padding: 0,
  zIndex: 10,
  spinGlow: true,
};

interface AvatarStore {
  settings: AvatarSettings;
  updateSettings: (updates: Partial<AvatarSettings>) => void;
  resetSettings: () => void;
}

export const useAvatarStore = create<AvatarStore>()(
  persist(
    (set) => ({
      settings: defaultAvatarSettings,
      updateSettings: (updates) =>
        set((state) => ({
          settings: { ...state.settings, ...updates },
        })),
      resetSettings: () => set({ settings: defaultAvatarSettings }),
    }),
    {
      name: 'vc_avatar_settings',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') return localStorage;
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    }
  )
);
