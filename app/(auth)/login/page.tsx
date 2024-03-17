import React from 'react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const page = () => {
  return (
    <div>
      <div className="w-full min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center">
            <CloudIcon className="mx-auto h-12 w-12" />
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">欢迎登录</h1>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input id="email" placeholder="m@example.com" required type="email" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">密码</Label>
                <Link className="ml-auto inline-block text-sm underline" href="#">
                  忘记密码？
                </Link>
              </div>
              <Input id="password" required type="password" />
            </div>
            <Button className="w-full">登录</Button>
          </div>
          <div className="space-y-4 text-sm">
            <Link
              className="w-full inline-block p-2 rounded-md border border-gray-200 border-gray-200 text-center transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              href="#"
            >
              注册账号
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

function CloudIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}
