'use client';
import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useModalStore } from '@/store/use-modal';
import bytes from 'bytes';
import { formatCreatedAt } from '@/utils/genDate';

const FileDetailModal = () => {
  const { data, onClose, isOpen, type, OnOpen } = useModalStore();
  const { file } = data;

  const isOpenModal = isOpen && type === 'fileDetailModal';
  if (!isOpenModal) return null;
  const fileTypeArr = file.name.split('.');
  const fileType = fileTypeArr[fileTypeArr.length - 1];
  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>文件信息</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">文件名</p>
            <p className="font-medium">{file.name}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">文件类型</p>
            <p className="font-medium">{fileType}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">文件大小</p>
            <p className="font-medium">{bytes(file.size)}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">上传于</p>
            <p className="font-medium">{formatCreatedAt(file.createdAt.toISOString())}</p>
          </div>
        </div>
        {/* <DialogFooter>
          <div>
            <Button variant="outline">Close</Button>
          </div>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default FileDetailModal;
