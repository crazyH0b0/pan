'use client';
import * as React from 'react';

import { useFolderStore } from '@/store/use-folder';
import { Checkbox } from '@/components/ui/checkbox';
import dynamic from 'next/dynamic';
import FolderSkeleton from '../Skelton/FolderSkeleton';
import { File } from '@prisma/client';
import useFilePathStore, { setFilePath } from '@/store/use-file-path';
import useFilesStore, { setFiles } from '@/store/use-files';
import { getFiles } from '@/actions/get-files';
import { FileIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import DeleteBtn from './delete-btn';
const DynamicComponentWithNoSSR = dynamic(() => import('./data-table-item'), {
  loading: () => <FolderSkeleton></FolderSkeleton>,
  ssr: false,
});

interface DataTableDemoProps {
  files: File[];
  slug: string[];
  panId: string;
}

function DataTableDemo({ panId, slug, files }: DataTableDemoProps) {
  let type = usePathname().split('/')[2];
  // type = type === 'list' ? undefined : type;
  const { selectedFolders, setSelectedFolders, clearSelectedFolders } = useFolderStore();
  const parentId = useFilePathStore((state) => state.parentId);
  setFilePath(slug, parentId);
  // const fileArr = useFilesStore((state) => state.files);
  let pId = '';
  React.useEffect(() => {
    // const parentId = slug[slug.length - 1];
    // if (parentId === 'list') {
    //   pId = parentId;
    // } else {
    //   const splitId = parentId.split('%')[0];
    //   pId = splitId;
    // }
    clearSelectedFolders();

    // getAllFiles(panId, pId);
  }, [slug, parentId]);
  const getAllFiles = async (pandId: string, pId: string) => {
    setFiles([]);
    const res = await getFiles(pandId, pId, type);
    setFiles(res);
  };
  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[500px] ">
        <div className="flex flex-col items-center gap-2 text-center">
          <FileIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
          <h1 className="font-bold text-3xl">空空如也</h1>
          <p className="w-full max-w-[500px] text-gray-500 dark:text-gray-400">
            您可以开始将文件上传到您的账户，以便开始使用
          </p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-between items-center h-12 ">
        <div className="space-x-2 flex items-center">
          <Checkbox
            className="border-2"
            checked={
              files.length === selectedFolders.length && selectedFolders.length !== 0
                ? true
                : selectedFolders.length > 0
                  ? 'indeterminate'
                  : false
            }
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedFolders(files);
              } else {
                clearSelectedFolders();
              }
            }}
          />
          <span className="ml-2">
            {selectedFolders.length > 0 ? `已选中 ${selectedFolders.length} 项` : `${files.length} 项`}
          </span>
          {selectedFolders.length > 0 && <DeleteBtn />}
        </div>
      </div>
      <div className="grid md:grid-cols-4 lg:grid-cols-7 gap-3 mt-3 w-full">
        {files.map((folder) => {
          return <DynamicComponentWithNoSSR key={folder.fileId} folder={folder} />;
        })}
      </div>
    </div>
  );
}
export default DataTableDemo;
