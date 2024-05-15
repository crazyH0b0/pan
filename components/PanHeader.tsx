import React from 'react';
import { ModeToggle } from './ModeToggle';
// import { UserButton } from '@clerk/nextjs';
import Logo from './Logo';
import { PieChart, Power } from 'lucide-react';
import Link from 'next/link';
import Logout from './logout';
import { redirect } from 'next/navigation';

const PanHeader = () => {
  return (
    <nav className="flex items-center justify-between h-[60px] border-b border-border px-4 py-6 w-full">
      <Logo />
      <div className="flex gap-4 items-center">
        <Logout />
        <Link href="/pan/charts ">
          <PieChart className="cursor-pointer" />
        </Link>
        <ModeToggle />
        {/* <UserButton afterSignOutUrl="/" /> */}
      </div>
    </nav>
  );
};

export default PanHeader;
