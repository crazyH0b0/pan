'use client';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className=" flex items-center justify-center w-full">
      <Button onClick={() => reset()} className="px-4 py-2 ">
        网络错误，请重新试试！
      </Button>
    </div>
  );
}
