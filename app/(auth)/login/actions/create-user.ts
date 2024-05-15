'use server';
import { z } from 'zod';
import { formSchema } from '../_component/login/schema';
import prisma from '@/lib/prisma';

export async function create(data: z.infer<typeof formSchema>) {
  const { username, password } = data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
        password,
      },
    });

    if (existingUser) {
      return null; // 用户已存在，返回 null
    } else {
      const newUser = await prisma.user.create({
        data: {
          username,
          password,
        },
      });
      await prisma.pan.create({
        data: {
          userId: newUser.id,
        },
      });
      return newUser; // 返回新创建的用户
    }
  } catch (error) {
    console.log(error);
    return null; // 捕获到错误时返回 null
  }
}
