'use client';
import React from 'react';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { useModalStore } from '@/store/use-modal';
import { File } from '@prisma/client';
import { auth, currentUser, useAuth } from '@clerk/nextjs';

import { deleteFile } from '@/actions/deleteFile';
import axios from 'axios';

const ContextMenuWrapper = ({ children, folder }: { children: React.ReactNode; folder: File }) => {
  const { OnOpen } = useModalStore();
  // const { userId } = auth();
  // const { userId } = auth();
  // const { userId } = useAuth();
  const onDelete = async () => {
    await axios.delete('/api/folder', {
      params: {
        fileId: folder.fileId,
      },
    });
  };
  return (
    <ContextMenu>
      <ContextMenuTrigger className="w-[120px] ">{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset>
          下载
          {/* <ContextMenuShortcut>win[</ContextMenuShortcut> */}
        </ContextMenuItem>

        <ContextMenuSeparator />
        <ContextMenuItem inset>
          重命名
          {/* <ContextMenuShortcut>⌘R</ContextMenuShortcut> */}
        </ContextMenuItem>
        <ContextMenuCheckboxItem>分享</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="pedro">
          <ContextMenuRadioItem value="pedro">详细信息</ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">
            <p className="text-rose-500" onClick={onDelete}>
              删除
            </p>
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ContextMenuWrapper;
