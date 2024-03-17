'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from 'lucide-react';
import { Montserrat } from 'next/font/google';

import { Button } from './ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { FreeCounter } from './free-counter';

const poppins = Montserrat({ weight: '600', subsets: ['latin'] });

const PanSidebar = () => {
  const pathname = usePathname();
  const routes = [
    {
      label: '全部',
      icon: LayoutDashboard,
      href: '/list',
      color: 'text-sky-500',
    },

    {
      label: '图片',
      icon: ImageIcon,
      color: 'text-pink-700',
      href: '/image',
    },
    {
      label: '视频',
      icon: VideoIcon,
      color: 'text-orange-700',
      href: '/video',
    },
    {
      label: '音乐',
      icon: Music,
      color: 'text-emerald-500',
      href: '/music',
    },
    {
      label: '代码',
      icon: Code,
      color: 'text-green-700',
      href: '/code',
    },
    {
      label: '设置',
      icon: Settings,
      href: '/settings',
    },
  ];
  return (
    <div className="flex pb-3 flex-col items-center h-full border-r shadow text-primary w-[300px] py-2  bg-background">
      <div className="w-full px-3 flex-1">
        <div className=" w-full">
          <div className="space-y-1">
            {routes.map((route) => (
              <Button key={route.href} asChild variant={'ghost'}>
                <Link
                  href={route.href}
                  className={cn(
                    'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer  rounded-lg transition',
                    pathname === route.href ? 'underline ' : 'text-zinc-400'
                  )}
                >
                  <div className="flex items-center flex-1">
                    <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                    {route.label}
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <FreeCounter></FreeCounter>
      </div>
    </div>
  );
};

export default PanSidebar;
