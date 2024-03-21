import { User } from '@prisma/client';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const initFilePathState = { path: [], parentId: 'list' };

const useFilePathStore = create<{ path: string[], parentId: string }>()(
  immer(
    devtools(() => {
      return { ...(initFilePathState as any) };
    })
  )
);

// 导入 Store 的 Hook
export default useFilePathStore;

export const setFilePath = (path: string[], parentId: string) => {
  useFilePathStore.setState((state) => {
    state.path = path;
    state.parentId = parentId
  });
};
