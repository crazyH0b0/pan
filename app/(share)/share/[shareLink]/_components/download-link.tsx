'use client';
import { File } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';

const DownloadLink = ({ file }: { file: File }) => {
  const handleDownLoad = () => {
    if (file.url) {
      toast('正在准备下载');
      const link = document.createElement('a');
      link.href = file.url; // 设置下载链接地址
      link.setAttribute('download', ''); // 添加download属性，指示浏览器下载
      document.body.appendChild(link);
      link.click(); // 模拟点击链接
      document.body.removeChild(link); // 点击后移除链接
    } else {
      toast('下载链接为空！');
    }
  };
  return (
    <Link className="text-sm font-medium text-[#F59E0B]" href="#" onClick={handleDownLoad}>
      下载
    </Link>
  );
};

export default DownloadLink;
