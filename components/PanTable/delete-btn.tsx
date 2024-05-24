'use client';
import React from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { useFolderStore } from '@/store/use-folder';
import { deleteFile, recoverFile } from '@/actions/deleteFile';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';

const DeleteBtn = () => {
  const pathname = usePathname();
  const { selectedFolders } = useFolderStore();
  const onDelete = async () => {
    console.log(pathname);

    try {
      if (pathname === '/pan/trash') {
        console.log('我是恢复', selectedFolders);

        const res = await recoverFile(selectedFolders);
        toast.success('恢复成功~');
      } else {
        const res = await deleteFile(selectedFolders);
        toast.success('删除成功~');
      }
    } catch (error) {
      toast.error('删除失败');
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'destructive'} size={'sm'}>
          {pathname === '/pan/trash' ? '恢复' : '删除'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            你确定要
            {pathname === '/pan/trash' ? '恢复' : '删除'}
            这些文件吗?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              取消
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant={'destructive'} onClick={onDelete}>
              确定
            </Button>
          </DialogClose>
        </DialogFooter>
        {/* <div className="flex justify-end gap-x-4">
          <Button>取消</Button>
          <Button variant={'destructive'}>确定</Button>
        </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBtn;
