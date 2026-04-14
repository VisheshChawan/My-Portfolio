import { create } from 'zustand';
import { persist, StateStorage, createJSONStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';

// IndexedDB adapter — same pattern as resumeStore, avoids localStorage quota limits
const idbStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    if (typeof window === 'undefined') return null;
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    if (typeof window === 'undefined') return;
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    if (typeof window === 'undefined') return;
    await del(name);
  },
};

export interface ProfileImageData {
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadDate: string;
  base64Data: string;
  width: number;
  height: number;
}

interface ProfileImageStore {
  image: ProfileImageData | null;
  setImage: (image: ProfileImageData) => void;
  deleteImage: () => void;
}

export const useProfileImageStore = create<ProfileImageStore>()(
  persist(
    (set) => ({
      image: null,
      setImage: (image) => set({ image }),
      deleteImage: () => set({ image: null }),
    }),
    {
      name: 'vc_portfolio_avatar',
      storage: createJSONStorage(() => idbStorage),
    }
  )
);
