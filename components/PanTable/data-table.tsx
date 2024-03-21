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
const DynamicComponentWithNoSSR = dynamic(() => import('./data-table-item'), {
  loading: () => <FolderSkeleton></FolderSkeleton>,
  ssr: false,
});

interface DataTableDemoProps {
  // files: File[];
  slug: string[];
  panId: string;
}

function DataTableDemo({ panId, slug }: DataTableDemoProps) {
  const { selectedFolders, setSelectedFolders, clearSelectedFolders } = useFolderStore();
  const parentId = useFilePathStore((state) => state.parentId);
  setFilePath(slug, parentId);
  const fileArr = useFilesStore((state) => state.files);
  let pId = '';
  React.useEffect(() => {
    const parentId = slug[slug.length - 1];
    if (parentId === 'list') {
      pId = parentId;
    } else {
      const splitId = parentId.split('%')[0];
      pId = splitId;
    }
    clearSelectedFolders();

    getAllFiles(panId, pId);
  }, [slug, parentId]);
  const getAllFiles = async (pandId: string, pId: string) => {
    setFiles([]);
    const res = await getFiles(pandId, pId);
    setFiles(res);
  };
  return (
    <div>
      <div className="flex justify-between items-center ">
        <div className="space-x-2 flex items-center">
          <Checkbox
            className="border-2"
            checked={
              fileArr.length === selectedFolders.length && selectedFolders.length !== 0
                ? true
                : selectedFolders.length > 0
                  ? 'indeterminate'
                  : false
            }
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedFolders(fileArr);
              } else {
                clearSelectedFolders();
              }
            }}
          />
          <span className="ml-2">
            {selectedFolders.length > 0 ? `已选中 ${selectedFolders.length} 项` : `${fileArr.length} 项`}
          </span>
        </div>
      </div>
      <div className="grid md:grid-cols-4 lg:grid-cols-7 gap-3 mt-3 w-full">
        {fileArr.map((folder) => {
          return <DynamicComponentWithNoSSR key={folder.fileId} folder={folder} />;
        })}
      </div>
    </div>
  );
}
export default DataTableDemo;
