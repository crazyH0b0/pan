import React from 'react';
import { ModeToggle } from './ModeToggle';
import { UserButton } from '@clerk/nextjs';
import Logo from './Logo';

const PanHeader = () => {
  return (
    <nav className="flex items-center justify-between h-[60px] border-b border-border px-4 py-6 w-full">
      <Logo />
      <div className="flex gap-4 items-center">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default PanHeader;
