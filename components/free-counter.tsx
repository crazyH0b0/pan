import { Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
// {
//   isPro = false,
//   apiLimitCount = 0,
// }: {
//   isPro: boolean,
//   apiLimitCount: number
// }
export const FreeCounter = () => {
  const [mounted, setMounted] = useState(false);
  // const proModal = useProModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // if (isPro) {
  //   return null;
  // }

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm mb-4 space-y-2 ">
            <p>
              {/* {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations */}
              1.2GB / 3GB 免费存储
            </p>
            {/* <Progress className="h-3" value={(apiLimitCount / MAX_FREE_COUNTS) * 100} /> */}
            <Progress className="h-3" value={40} />
          </div>
          <Button variant="premium" className="w-full">
            升级
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
