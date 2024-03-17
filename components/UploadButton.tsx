'use client';
import React from 'react';
import { Button } from './ui/button';
import Dropzone, { useDropzone } from 'react-dropzone';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FileUpload } from './upload/file-upload';
const UploadButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-semibold text-lg">
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
