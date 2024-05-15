import React from 'react';
import { z } from 'zod';
import Login from './_component/login/login';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Register from './_component/register/register';

const page = async () => {
  return (
    <div>
      <div className="w-full min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center">
            <CloudIcon className="mx-auto h-12 w-12" />
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">欢迎</h1>
            </div>
          </div>
          <Tabs defaultValue="login" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="login">登录</TabsTrigger>
              <TabsTrigger value="register">注册</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              {' '}
              <Login />
            </TabsContent>
            <TabsContent value="register">
              <Register />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default page;

function CloudIcon(props: any) {
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
