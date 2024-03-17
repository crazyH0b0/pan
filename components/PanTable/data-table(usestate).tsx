'use client';
import * as React from 'react';

import { Folder, useFolderStore } from '@/store/use-folder';
import DataTableItem from './data-table-item(usestate)';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';

export function DataTableDemo() {
  const { folders } = useFolderStore();
  const [selectedList, setSelectedList] = React.useState<Folder[]>([]);

  function onCheckedChange(checked: boolean, folder: Folder) {
    checked
      ? setSelectedList([...selectedList, folder])
      : setSelectedList((pre) => {
          return pre?.filter((value) => value !== folder);
        });
  }
  return (
    <div>
      <div className="flex justify-between items-center ">
        <div className="space-x-2 flex items-center">
          <Checkbox
            className="border-2"
            checked={folders.length === selectedList.length ? true : selectedList.length > 0 ? 'indeterminate' : false}
            onCheckedChange={(checked) => {
              if (checked) {
                const folderss = [...folders];
                setSelectedList(folderss);
              } else {
                setSelectedList([]);
              }
            }}
          />
          <span className="ml-2">
            {selectedList.length > 0 ? `${selectedList.length} selected` : `${folders.length} items`}
          </span>
        </div>
      </div>
      <div className="grid md:grid-cols-4 lg:grid-cols-7 gap-3 mt-3 w-full">
        {folders.map((folder) => {
          const isChecked = selectedList?.includes(folder);
          return <DataTableItem key={folder.id} folder={folder} isChecked={isChecked} onChange={onCheckedChange} />;
        })}
      </div>
    </div>
  );
}
