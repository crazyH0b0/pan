'use client';
import * as React from 'react';

import { useFolderStore } from '@/store/use-folder';
import { Checkbox } from '@/components/ui/checkbox';
import dynamic from 'next/dynamic';
import FolderSkeleton from '../Skelton/FolderSkeleton';
import { File } from '@prisma/client';
const DynamicComponentWithNoSSR = dynamic(() => import('./data-table-item'), {
  loading: () => <FolderSkeleton></FolderSkeleton>,
  ssr: false,
});

interface DataTableDemoProps {
  files: File[];
}

function DataTableDemo({ files }: DataTableDemoProps) {
  const { selectedFolders, setSelectedFolders, clearSelectedFolders } = useFolderStore();

  // if (files.length === 0) return <div>empty</div>;
  return (
    <div>
      <div className="flex justify-between items-center ">
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
