'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from './schema';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader } from 'lucide-react';
import { login } from '../../actions/login-user';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/store/user-store';

const Login = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const { isSubmitting } = form.formState;
  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    // onSubmit(data) // 在客户端上调用 onSubmit 函数
    const res = await login(data.username);
    if (res.success) {
      updateUser(res.user!);
      toast('登录成功~');
      router.push('/list');
      return;
    }
    toast.error('登录失败~');
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>用户名</FormLabel>
                <FormControl>
                  <Input placeholder="请输入用户名" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>密码</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="请输入密码" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <div className="w-full flex justify-between">
          <Button type="submit" className="" disabled={isSubmitting}>
            {isSubmitting && <Loader size={15} className="animate-spin " />}
            登录
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Login;
