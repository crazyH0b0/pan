'use client';
import React from 'react';
import { FcFolder, FcImageFile, FcFile } from 'react-icons/fc';
import { cn } from '@/lib/utils';
import { Checkbox } from '../ui/checkbox';
import { useFolderStore } from '@/store/use-folder';
import ContextMenuWrapper from '../ContextMenuWrapper';
import TooltipWrapper from '../TooltipWrapper';
import { File } from '@prisma/client';
import { parse, format } from 'date-fns';

const DataTableItem = ({ folder }: { folder: File }) => {
  const { setSelectedFolders, selectedFolders } = useFolderStore();
  const isChecked = selectedFolders?.includes(folder);

  function onCheckedChange(checked: boolean) {
    const filterSelectedFolders = selectedFolders?.filter((value) => value !== folder);

    checked ? setSelectedFolders([...selectedFolders, folder]) : setSelectedFolders(filterSelectedFolders);
  }

  const formattedDate = format(folder.createdAt, 'yyyy-MM-dd HH:mm');
  // const [mounted, setMounted] = React.useState(false);
  // React.useEffect(() => {
  //   setMounted(true);
  // }, []);
  // if (!mounted) return null; // 防止水合错误
  return (
    <ContextMenuWrapper folder={folder}>
      <TooltipWrapper dispalyName={folder.name}>
        <div
          key={folder.fileId}
          className={cn(
            'relative group transition duration-75 cursor-pointer pb-3 rounded-xl hover:bg-[#f5f5f5] hover:dark:bg-[#262626] flex flex-col items-center',
            isChecked && 'bg-[#f5f5f5] dark:bg-[#262626] '
          )}
        >
          <Checkbox
            className={cn('absolute top-5 left-3   border-2 hidden group-hover:block', isChecked && 'block')}
            checked={isChecked}
            onCheckedChange={(checked: boolean) => onCheckedChange(checked)}
          />
          {(folder.type === 'jpg' || folder.type === 'png') && <FcImageFile size={120} />}
          {(folder.type === 'text' || folder.type === 'md' || folder.type === 'pdf' || folder.type === 'doc') && (
            <FcFile size={120} />
          )}
          {folder.type === 'folder' && <FcFolder size={120} />}

          <div className="w-[115px] flex flex-col items-center">
            <span className="text-base w-full text-center line-clamp-2 overflow-hidden text-ellipsis break-words">
              {folder.name}
            </span>
            <span className="text-xs text-muted-foreground">{formattedDate}</span>
          </div>
        </div>
      </TooltipWrapper>
    </ContextMenuWrapper>
  );
};

export default DataTableItem;
