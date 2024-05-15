'use server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function login(username: string, password: string) {
  const cookieStore = cookies();

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      return { success: false, message: '用户不存在' };
    }
    if (user.isDisabled) {
      return { success: false, message: '用户已被禁用' };
    }
    if (user.password === password) {
      // 在这里添加验证密码的逻辑，例如使用加密库比较密码哈希值
      // 假设密码验证通过
      cookieStore.set('user', JSON.stringify(user));
      return { success: true, message: '登录成功', user };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: '登录失败' };
  }
}
