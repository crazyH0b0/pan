import { Folder } from '@/store/use-folder';
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface TooltipWrapperProps {
  children: React.ReactNode;
  dispalyName: string;
}

const TooltipWrapper = ({ children, dispalyName }: TooltipWrapperProps) => {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>

        <TooltipContent side="top">
          <p>{dispalyName}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
