import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type ModalType =  "createFolder"


export interface Folder {
  id?: string;
  size: string;
  createdAt: string;
  fileName: string;
}

export interface FolderProps {

  data: Folder[],
  addFolder:(folder:Folder)=>void


}
const data: Folder[] = [
  {
    id: "folder1",
    size: "_",
    createdAt: "2023-01-01",
    fileName: "Folder 1"
  },

  {
    id: "folder2",
    size: "_",
    createdAt: "2023-02-01",
    fileName: "Folder 2"
  },
  {
    id: "folder3",
    size: "_",
    createdAt: "2023-03-01",
    fileName: "Folder 3"
  },
  {
    id: "folder4",
    size: "_",
    createdAt: "2023-04-01",
    fileName: "Folder 4"
  },
  {
    id: "folder5",
    size: "_",
    createdAt: "2023-05-01",
    fileName: "Folder 5"
  },
  {
    id: "folder6",
    size: "_",
    createdAt: "2023-06-01",
    fileName: "Folder 6"
  },
  {
    id: "folder7",
    size: "_",
    createdAt: "2023-07-01",
    fileName: "Folder 7"
  },
  {
    id: "folder8",
    size: "_",
    createdAt: "2023-08-01",
    fileName: "Folder 8"
  },
  {
    id: "folder9",
    size: "_",
    createdAt: "2023-09-01",
    fileName: "Folder 9"
  },
  {
    id: "folder10",
    size: "_",
    createdAt: "2023-10-01",
    fileName: "Folder 10"
  },
  
];

export const useFolderStore = create<FolderProps>()(devtools(immer(
  (set) => ({
    data:data,
    addFolder:(folder) => set((state)=>({data: [...state.data, folder]}))
  })

)))


