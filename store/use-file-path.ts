import { User } from '@prisma/client';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const initFilePathState = { path: [] };

const useFilePathStore = create<{ path: string[] }>()(
  immer(
    devtools(() => {
      return { ...(initFilePathState as any) };
    })
  )
);

// 导入 Store 的 Hook
export default useFilePathStore;

export const setFilePath = (path: string[]) => {
  useFilePathStore.setState((state) => {
    state.path = path;
  });
};
