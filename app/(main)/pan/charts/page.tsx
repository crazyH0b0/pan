import React from 'react';
import Bar from './bar';
import { ScrollArea } from "@/components/ui/scroll-area"

const ChartsPage = () => {
  return (
    <ScrollArea className="h-[660px] w-full rounded-md border px-2 ">


    <div className='w-full h-full grid grid-rows-2 grid-cols-2 gap-4 p-2'>
      <div className=' flex flex-col items-center justify-center p-4'>
        <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Number of species threatened with extinction (2021)
        </h3>
        <Bar />
      </div>
      <div className=' flex flex-col items-center justify-center p-4'>
        <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Number of species threatened with extinction (2021)
        </h3>
        <Bar />
      </div>
      <div className=' flex flex-col items-center justify-center p-4'>
        <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Number of species threatened with extinction (2021)
        </h3>
        <Bar />
      </div>
      <div className=' flex flex-col items-center justify-center p-4'>
        <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Number of species threatened with extinction (2021)
        </h3>
        <Bar />
      </div>
    </div>
    </ScrollArea>
  );
};

export default ChartsPage;