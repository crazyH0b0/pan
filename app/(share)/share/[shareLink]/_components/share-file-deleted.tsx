import Link from 'next/link';
import React from 'react';

const ShareFileDeleted = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-red-500">文件分享已取消</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          很抱歉,该文件的分享已被取消。请联系文件所有者获取最新的分享信息。
        </p>
        <Link
          className="inline-flex items-center justify-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300"
          href="/pan/list"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
};

export default ShareFileDeleted;
