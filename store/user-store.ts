import { User } from '@prisma/client';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const initUserState: User = {} as User;

const useUserStore = create<User>()(
  immer(
    devtools(
      persist(
        () => {
          return {
            ...initUserState,
          };
        },
        { name: 'user-store' }
      )
    )
  )
);

// 导入 Store 的 Hook
export default useUserStore;

export const updateUser = (user: User) => {
  useUserStore.setState((state) => {
    state.username = user.username;
    state.id = user.id;
  });
};
