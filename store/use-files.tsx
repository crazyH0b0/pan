import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { File } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const initFilesState = {
  files: [] as File[],
};

const useFilesStore = create<typeof initFilesState>()(
  immer(
    devtools(() => {
      return { ...initFilesState };
    })
  )
);

// 导入 Store 的 Hook
export default useFilesStore;

export const setFiles = (files: File[]) => {
  useFilesStore.setState((state) => {
    state.files = files;
  });
};

export const deleteFileAction = (id: string) => {
  useFilesStore.setState((state) => {
    state.files = state.files.filter((item) => item.fileId !== id);
  });
};

export const addFileAction = (file: File) => {
  // useFilesStore.setState(state => {
  //   state.files.push(file)
  // })
  // revalidatePath('/pan/settings');
  // revalidatePath('/pan/list');
  revalidatePath('/pan/image');
  revalidatePath('/pan/video');
  revalidatePath('/pan/music');
  revalidatePath('/pan/code');
  revalidatePath('/pan/trash');
};

export const updateFileAction = (fileToUpdate: File) => {
  useFilesStore.setState((state) => {
    state.files = state.files.map((file) => {
      if (file.fileId === fileToUpdate.fileId) {
        return fileToUpdate; // 更新文件对象
      }
      return file; // 返回原始的文件对象
    });
  });
};
