'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code, FileText, ImageIcon, LayoutDashboard, Music, Settings, Share2, Trash2, VideoIcon } from 'lucide-react';
import { Montserrat } from 'next/font/google';

import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { FreeCounter } from './free-counter';
import { getCookieCredential } from '@/utils/getCookieCredential ';
import { User } from '@prisma/client';

const poppins = Montserrat({ weight: '600', subsets: ['latin'] });

const PanSidebar = () => {
  const pathname = usePathname();
  const [user, setUser] = React.useState<User>();
  React.useEffect(() => {
    getCookieCredential().then((res) => {
      setUser(res);
    });
  }, []);
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
      label: '分 享',
      icon: Share2,
      color: 'text-tremor-brand-muted',
      href: '/pan/share',
    },
    {
      label: '设 置',
      icon: Settings,
      href: '/pan/settings',
    },
  ];
  return (
    <div className="flex pb-3 ed flex-col  items-center h-full border-r shadow text-primary w-[300px] py-2  bg-background">
      <div className="w-full px-3 flex-1">
        <div className=" w-full">
          <div className="space-y-1">
            {routes.map((route) => {
              const disabled = route.label === '设 置' && user?.username !== 'admin';
              return (
                <Button className="w-full" key={route.href} variant={'ghost'} disabled={disabled}>
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
              );
            })}
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
