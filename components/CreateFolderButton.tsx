'use client';
import { Button } from './ui/button';
import { FaRegFolder } from 'react-icons/fa6';
import { useModalStore } from '@/store/use-modal';

const CreateFolderButton = () => {
  const { OnOpen } = useModalStore();
  return (
    <Button variant={'outline'} className="space-x-1" onClick={() => OnOpen('createFolder')}>
      <FaRegFolder size={15} />
      <span className=" font-semibold text-lg">创建文件夹</span>
    </Button>
  );
};

export default CreateFolderButton;
