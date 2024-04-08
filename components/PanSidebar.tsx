'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code, FileText, ImageIcon, LayoutDashboard, Music, Settings, Trash2, VideoIcon } from 'lucide-react';
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
      label: '全 部',
      icon: LayoutDashboard,
      href: '/pan/list',
      color: 'text-sky-500',
    },

    {
      label: '图 片',
      icon: ImageIcon,
      color: 'text-pink-700',
      href: '/pan/image',
    },
    {
      label: '视 频',
      icon: VideoIcon,
      color: 'text-orange-700',
      href: '/pan/video',
    },
    {
      label: '音 乐',
      icon: Music,
      color: 'text-emerald-500',
      href: '/pan/music',
    },
    {
      label: '代 码',
      icon: Code,
      color: 'text-green-700',
      href: '/pan/code',
    },
    {
      label: '文 本',
      icon: FileText,
      color: 'text-muted-foreground',
      href: '/pan/text',
    },
    {
      label: '回 收 站',
      icon: Trash2,
      color: 'text-rose-700',
      href: '/pan/trash',
    },
    {
      label: '设 置',
      icon: Settings,
      href: '/pan/settings',
    },
  ];
  return (
    <div className="flex pb-3  flex-col items-center h-full border-r shadow text-primary w-[300px] py-2  bg-background">
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
