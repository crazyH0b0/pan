import { File } from '@prisma/client';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type ModalType = 'createFolder';

export interface FolderProps {
  folders: File[];
  addFolder: (folder: File) => void;
  selectedFolders: File[];
  setSelectedFolders: (folder: File[]) => void;
  clearSelectedFolders: () => void;
}

export const useFolderStore = create<FolderProps>()(
  devtools(
    immer((set) => ({
      folders: [],
      addFolder: (folder) => set((state) => ({ folders: [...state.folders, folder] })),
      selectedFolders: [] as File[],
      setSelectedFolders: (folders) => set((state) => ({ selectedFolders: folders })),
      clearSelectedFolders: () => set((state) => ({ selectedFolders: [] })),
    }))
  )
);
