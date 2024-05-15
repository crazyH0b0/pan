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
import { deleteFile } from '@/actions/deleteFile';
import { toast } from 'sonner';

const DeleteBtn = () => {
  const { selectedFolders } = useFolderStore();
  const onDelete = async () => {
    try {
      const res = await deleteFile(selectedFolders);
      toast.success('删除成功');
    } catch (error) {
      toast.error('删除失败');
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'destructive'} size={'sm'}>
          删除
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>你确定要删除这些文件吗?</DialogTitle>
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
