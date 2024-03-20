import CreateFolderButton from '@/components/CreateFolderButton';
import UploadButton from '@/components/UploadButton';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-6 pt-4  w-full space-y-5  ">
      <div className="flex-1 w-full p-0">
        <div className="space-x-4 ">
          <UploadButton />
          <CreateFolderButton />
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default layout;
