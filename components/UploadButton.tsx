'use client';
import React from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FileUpload } from './upload/file-upload';
import { usePathname } from 'next/navigation';
const UploadButton = () => {
  const pathname = usePathname();
  const canUpload = pathname.includes('/pan/list');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={!canUpload} variant="outline" className="font-semibold text-lg">
          上传
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>上传文件</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FileUpload />
        <DialogFooter>
          {/* <Button type="submit" onClick={handleSubmit}>
            开始上传
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
