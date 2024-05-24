'use client';
import React from 'react';
import { FcFolder, FcImageFile, FcFile, FcVideoFile } from 'react-icons/fc';
import { cn } from '@/lib/utils';
import { Checkbox } from '../ui/checkbox';
import { useFolderStore } from '@/store/use-folder';
import ContextMenuWrapper from '../ContextMenuWrapper';
import TooltipWrapper from '../TooltipWrapper';
import { File } from '@prisma/client';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import useFilePathStore from '@/store/use-file-path';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import VideoModal from 'rc-video-modal';
import PdfViewer from './PdfViewer';
import Image from 'next/image';

const DataTableItem = ({ folder }: { folder: File }) => {
  const router = useRouter();
  const [isOpen, setOpen] = React.useState(false);
  const { setSelectedFolders, selectedFolders } = useFolderStore();
  const isChecked = selectedFolders?.includes(folder);
  const path = useFilePathStore((state) => state.path);

  function onCheckedChange(checked: boolean) {
    const filterSelectedFolders = selectedFolders?.filter((value) => value !== folder);

    checked ? setSelectedFolders([...selectedFolders, folder]) : setSelectedFolders(filterSelectedFolders);
  }

  const formattedDate = format(folder.createdAt, 'yyyy-MM-dd HH:mm');
  const handleViewFolder = () => {
    if (folder.type === 'folder') {
      const newPath = [...path];
      newPath.push(`${folder.fileId}&${folder.name}`);
      const newPathArr = newPath.join('/');
      router.push(newPathArr);
      // router.push(`/pan/list/${folder.name}`);
    }
  };
  // const [mounted, setMounted] = React.useState(false);
  // React.useEffect(() => {
  //   setMounted(true);
  // }, []);
  // if (!mounted) return null; // 防止水合错误
  return (
    <PhotoProvider>
      <ContextMenuWrapper folder={folder}>
        <TooltipWrapper dispalyName={folder.name}>
          <div
            onDoubleClick={handleViewFolder}
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
            {(folder.type === 'jpg' || folder.type === 'png') && (
              <>
                <PhotoView src={folder.url!}>
                  <Image width={120} height={120} src={folder.url!} alt="Image" />
                </PhotoView>
              </>
            )}
            {(folder.type === 'docx' ||
              folder.type === 'xml' ||
              folder.type === 'pptx' ||
              folder.type === 'ppt' ||
              folder.type === 'txt' ||
              folder.type === 'md' ||
              folder.type === 'pdf' ||
              folder.type === 'doc') && (
              <>
                {/* <button onClick={() => setOpen(true)}>View PDF</button> */}
                {/* {isOpen && <PdfViewer url={folder.url!} />} */}
                <FcFile size={120} />
              </>
            )}
            {(folder.type === 'mp4' || folder.type === 'VINEnc' || folder.type === 'mkv') && (
              <>
                {/* <button className="btn-primary" onClick={() => setOpen(true)}>
        VIEW DEMO
      </button> */}
                <div>
                  <VideoModal autoPlay={false} controls loop={false} muted width={'50%'} src={folder.url!}>
                    <FcVideoFile size={120} />
                    {/* <button
                        style={{
                          background: 'blue',
                          color: '#fff',
                          height: 40,
                          border: 'none',
                          borderRadius: '5px',
                          padding: '0 12px',
                        }}
                      >
                        播放视频
                      </button> */}
                  </VideoModal>
                </div>
                {/* <FcVideoFile onClick={() => setOpen(true)} size={120} /> */}
                {/* <video width="600" controls autoPlay>
                    <source
                      src="http://192.168.111.191:50075/webhdfs/v1/userFiles/d2a3ce72-8e21-408c-97d8-14f06b4b79b4/01.如何打造抖音账号.mp4?op=OPEN&namenoderpcaddress=master:9000&offset=0"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video> */}
              </>
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
    </PhotoProvider>
  );
};

export default DataTableItem;
