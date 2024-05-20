import React from 'react';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { FileMinus } from 'lucide-react';
import prisma from '@/lib/prisma';
import ShareFileDeleted from './_components/share-file-deleted';
import { formatCreatedAt } from '@/utils/genDate';
import { toast } from 'sonner';
import DownloadLink from './_components/download-link';
import bytes from 'bytes';

const sharePage = async ({ params }: { params: { shareLink: string } }) => {
  const shareWithInfo = await prisma.share.findUnique({
    where: {
      shareLink: params.shareLink,
    },
    include: {
      file: {
        // Share -> File
        include: {
          pan: {
            // File -> Pan
            include: {
              user: true, // Pan -> User
            },
          },
        },
      },
    },
  });

  // 从查询结果中提取实体类
  const file = shareWithInfo?.file;
  if (file?.isDeleted) {
    return <ShareFileDeleted />;
  }

  const user = shareWithInfo?.file?.pan?.user;
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader className="bg-[#F59E0B] text-white">
          <div className="text-center space-y-4">
            <h2 className="text-lg font-bold">文件分享</h2>
            <p className="text-sm font-medium leading-none">分享者： {user?.username}</p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 pt-4  px-6 ">
          <FileMinus size={50} />
          <div className="text-center space-y-1">
            <h3 className="text-sm font-medium leading-none">{file?.name}</h3>
            <p className="text-xs font-medium leading-none text-gray-500">{bytes(file?.size)} </p>
          </div>
          <div className="text-center space-y-2">
            <p className="text-xs font-medium leading-none text-gray-500">
              分享于 {formatCreatedAt(shareWithInfo?.createdAt.toISOString() ?? '')}
            </p>
            <DownloadLink file={file} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default sharePage;
