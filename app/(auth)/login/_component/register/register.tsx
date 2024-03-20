"use client"
import React from 'react'
import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { create } from '../../actions/create-user';
import { formSchema } from './schema';
import { useFormStatus } from 'react-dom';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';



const Register = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })
  const {isSubmitting} = form.formState
  const handleFormSubmit =async (data: z.infer<typeof formSchema>) => {    
    const res = await create(data)
    if(res !== null){
      toast("用户创建成功~")
      return
    }
      toast("用户创建失败~")
  }
  
  
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
              <Input placeholder="请输入密码" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
          </>
        )}
      />
             <FormField
        control={form.control}
        name="confirm"
        render={({ field }) => (
          <>
          <FormItem>
            <FormLabel>确认密码</FormLabel>
            <FormControl>
              <Input placeholder="请再次输入密码" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
          </>
        )}
      />
      <div className='w-full flex justify-between'>
      <Button type="submit" className=''  disabled={isSubmitting}  >
      {isSubmitting &&       <Loader size={15} className="animate-spin " />}
          注册
        </Button>     
            </div>
    </form>
  </Form>
  )
}

export default Register