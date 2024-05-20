import React from 'react';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { FileMinus } from 'lucide-react';
import Link from 'next/link';

const sharePage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader className="bg-[#F59E0B] text-white">
          <div className="text-center space-y-4">
            <h2 className="text-lg font-bold">文件分享</h2>
            <p className="text-sm font-medium leading-none">分享者： 用户221005202154</p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 pt-4  px-6 ">
          <FileMinus size={50} />
          <div className="text-center space-y-1">
            <h3 className="text-sm font-medium leading-none">流程图.png</h3>
            <p className="text-xs font-medium leading-none text-gray-500">1.2MB</p>
          </div>
          <div className="text-center space-y-2">
            <p className="text-xs font-medium leading-none text-gray-500">上传于 1 天前</p>
            <Link className="text-sm font-medium text-[#F59E0B]" href="#">
              下载
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default sharePage;
