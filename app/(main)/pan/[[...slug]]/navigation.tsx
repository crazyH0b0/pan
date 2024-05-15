'use client';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const Navigation = () => {
  const pathname = usePathname();
  const isDisabled = pathname.split('/').length === 3;
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <Button
        size="icon"
        variant="outline"
        disabled={isDisabled}
        onClick={() => {
          router.back();
        }}
      >
        <ChevronLeftIcon className="h-4 w-4" />
        <span className="sr-only">Previous</span>
      </Button>
    </div>
  );
};

export default Navigation;
