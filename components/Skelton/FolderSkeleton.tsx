import React from 'react';
import { Skeleton } from '../ui/skeleton';

const FolderSkeleton = () => {
  return (
    <div>
      <div className="grid md:grid-cols-4 lg:grid-cols-7 gap-3 mt-3  ">
        <div className=" pb-3 rounded-xl gap-3 flex flex-col  w-full">
          <Skeleton className="h-[120px] w-[120px] bg-[#f5f5f5] rounded-md" />
          <div className="  flex flex-col items-center  gap-2 w-[120px]">
            <Skeleton className="bg-[#f5f5f5] w-[100px] h-1  " />
            <Skeleton className="bg-[#f5f5f5] w-full h-1 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderSkeleton;
