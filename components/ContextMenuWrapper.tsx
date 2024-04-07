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
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { useModalStore } from '@/store/use-modal';
import { File } from '@prisma/client';

import { deleteFile } from '@/actions/deleteFile';
import { toast } from 'sonner';
import { deleteFileAction } from '@/store/use-files';
import useFilePathStore from '@/store/use-file-path';
import { genShareCode } from '@/actions/gen-share-code';

const ContextMenuWrapper = ({ children, folder }: { children: React.ReactNode; folder: File }) => {
  const path = useFilePathStore((state) => state.path);
  const parentId = path[path.length - 1].split('%')[0];
  const { OnOpen } = useModalStore();
  const onDelete = async () => {
    console.log('删除');

    const fileToDelete = await deleteFile(folder);
    if (fileToDelete) {
      toast('删除成功');
      deleteFileAction(fileToDelete.fileId);
      return;
    }
    toast('删除失败');
  };
  const onRenameFile = async () => {
    OnOpen('renameModel', {
      folder,
      parentId,
    });
  };

  const onDownload = () => {
    if (folder.url) {
      toast('正在准备下载');
      const link = document.createElement('a');
      link.href = folder.url; // 设置下载链接地址
      link.setAttribute('download', ''); // 添加download属性，指示浏览器下载
      document.body.appendChild(link);
      link.click(); // 模拟点击链接
      document.body.removeChild(link); // 点击后移除链接
    } else {
      toast('下载链接为空！');
    }
  };

  const onShare = async () => {
    const code = await genShareCode(folder);
    OnOpen('inviteModal', { file: folder, code });
  };
  return (
    <ContextMenu>
      <ContextMenuTrigger className="w-[120px] ">{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={onDownload}>
          下载
          {/* <ContextMenuShortcut>win[</ContextMenuShortcut> */}
        </ContextMenuItem>

        <ContextMenuSeparator />
        <ContextMenuItem inset onClick={onRenameFile}>
          重命名
          {/* <ContextMenuShortcut>⌘R</ContextMenuShortcut> */}
        </ContextMenuItem>
        <ContextMenuCheckboxItem onClick={onShare}>分享</ContextMenuCheckboxItem>
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
