'use server';

import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function disableUserAction(username: string, on: boolean) {
  await prisma.user.update({
    where: {
      username,
    },
    data: {
      isDisabled: on,
    },
  });
}

// TODO: 调用 HDFS 的接口删除对应用户的文件夹
export async function deleteUserAction(username: string, userId: string) {
  try {
    await fetch(`http://localhost:8090/hdfs/deleteFolder?userId=${userId}`, {
      method: 'DELETE',
    });
    await prisma.user.delete({
      where: {
        username,
      },
    });
    revalidatePath('/pan/settings');
  } catch (error) {
    console.log(error);

    throw Error('报错了');
  }
}
