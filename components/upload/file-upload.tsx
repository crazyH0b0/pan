'use client';

import { FileIcon, XCircleIcon, Loader, Check, ShieldAlert } from 'lucide-react';
import '@uploadthing/react/styles.css';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import useFilePathStore from '@/store/use-file-path';
import { addFileAction } from '@/store/use-files';
export const FileUpload = () => {
  const path = useFilePathStore((state) => state.path);
  const router = useRouter();
  const [files, setFiles] = React.useState<File[]>([]);
  const [isUploading, setIsUploading] = React.useState(false);
  const [progressInfos, setprogressInfos] = React.useState<{ status: string; filename: string }[]>([]);
  const parentId = path[path.length - 1].split('%')[0];
  const onDrop = React.useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true);
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      const _progressInfos = [...progressInfos];
      acceptedFiles.forEach(async (file, index) => {
        if (file.size > 3 * 1024 * 1024 * 1024) {
          // Check if file size exceeds 3GB
          _progressInfos[index] = { status: 'error', filename: file.name };
          setIsUploading(false);
          toast.error('文件超出限定大小，上传失败');
          return; // Skip uploading this file
        }
        _progressInfos[index] = { status: '', filename: '' };
        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', '/');
        formData.append('parentId', parentId);
        try {
          let response: any = await fetch('/api/folder', {
            method: 'POST',
            body: formData,
          });
          response = await response.json();
          _progressInfos[index].status = 'success';
          toast(response.message);
          // addFileAction(response.data);
          router.refresh();
        } catch (error) {
          _progressInfos[index].status = 'error';
        } finally {
          _progressInfos[index].filename = file.name;
          setprogressInfos((preProgressInfos) => [...preProgressInfos, ..._progressInfos]);
          setIsUploading(false);
        }
      });
    },
    [files, progressInfos]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col gap-4">
      <div
        {...getRootProps({
          className:
            'border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-gray-300',
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p className="text-sm text-gray-300">将文件拖拽到这里，或点击选择文件</p>
        )}
      </div>
      <div className="flex flex-col gap-4 w-full  ">
        {files.map((file, index) => {
          const progress = progressInfos.find((progress) => progress.filename === file.name);
          return (
            <div key={file.name} className="flex items-center  gap-2 text-sm  w-full justify-between ">
              <div className="flex items-center gap-2  ">
                <Loader
                  className={cn('hidden', progress?.status === undefined && isUploading && 'animate-spin block')}
                  size={10}
                />
                {progress?.status === 'success' && <Check color="green" size={15} />}
                {progress?.status === 'error' && <ShieldAlert color="red" size={15} />}
                <FileIcon size={15} />
              </div>
              <div className="truncate flex-1 w-12">{file.name}</div>
              {/* <XCircleIcon className="" size={20} /> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};
