'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useModalStore } from '@/store/use-modal';
import { useForm } from 'react-hook-form';
import { Loader } from 'lucide-react';
import { renameFileAction } from '@/actions/rename-file';
import { File } from '@prisma/client';
import { updateFileAction } from '@/store/use-files';
import { toast } from 'sonner';
const formSchema = z.object({
  filename: z.string().min(1).max(50),
});
const RenameFileModal = () => {
  const { type, isOpen, data, onClose } = useModalStore();

  React.useEffect(() => {
    form.setValue('filename', data.folder?.name as string); // 更新 filename 的值为 data.name
  }, [data.folder]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      filename: '',
    },
  });
  const {
    formState: { isSubmitting },
  } = form;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await renameFileAction(data.folder as File, values.filename);
      await updateFileAction(res);
      onClose();
      toast('重命名成功');
    } catch (error) {
      toast('重命名失败');
    }
  }
  const isOpenModal = isOpen && type === 'renameModel';
  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>重命名文件</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="filename"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="请输入 文件/文件夹 的名字" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* TODO: 修改 loader 大小 */}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader className="animate-spin" />}
              修改
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameFileModal;
