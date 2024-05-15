import { Loader } from 'lucide-react';
import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      加载设置...
      <Loader className="animate-spin " />
    </div>
  );
};

export default Loading;
