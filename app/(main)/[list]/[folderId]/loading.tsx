import { Loader } from 'lucide-react';
import React from 'react';

const loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Loader className="animate-spin bg-red-600 z-50  h-screen w-screen" />
    </div>
  );
};

export default loading;
