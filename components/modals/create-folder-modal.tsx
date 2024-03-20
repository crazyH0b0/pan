'use client';
import React from 'react';
import { FcFolder } from 'react-icons/fc';
import axios from 'axios';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useModalStore } from '@/store/use-modal';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useFolderStore } from '@/store/use-folder';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useRouter } from 'next/navigation';
import useFilePathStore from '@/store/use-file-path';
import { createFolder } from '@/app/actions/create-folder';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Folder name must be at least 1 characters.',
  }),
});

const CreateFolderModal = () => {
  const { path } = useFilePathStore();
  const { folders } = useFolderStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'folder',
    },
  });
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    inputRef.current?.focus;
  }, []);
  const { addFolder } = useFolderStore();
  const { isOpen, onClose, type } = useModalStore();
  const isModalOpen = isOpen && type === 'createFolder';
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const folder = await createFolder(values.name, path.join('/'));
      form.reset();
      toast('文件夹创建成功');
      router.refresh();
      window.location.reload();
      onClose();
    } catch (error) {
      toast('文件夹创建失败');
    }
    form.reset();
    onClose();
  };
  const handleModalClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>创建文件夹</DialogTitle>
        </DialogHeader>
        <div className="w-full flex items-center justify-center">
          <FcFolder size={150} />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-end ">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFolderModal;
