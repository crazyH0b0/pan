'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function handleDeleteFileByHDFS(fileId: string, fileName: string, pandID: string) {
  try {
    await prisma.file.delete({
      where: {
        fileId,
      },
    });
    const pan = await prisma.pan.findUnique({
      where: {
        id: pandID,
      },
      include: {
        user: true,
      },
    });
    const res = await fetch(`http://localhost:8090/hdfs/delete?fileName=${fileName}&userId=${pan?.user.id}`, {
      method: 'DELETE',
    });
    await res.json();
    revalidatePath('/pan/settings');
    revalidatePath('/pan/list');
    revalidatePath('/pan/image');
    revalidatePath('/pan/video');
    revalidatePath('/pan/music');
    revalidatePath('/pan/code');
    revalidatePath('/pan/trash');
  } catch (error) {}
}

export async function getUsers(keyword: string) {
  const users = await prisma.user.findMany({
    where: {
      username: {
        contains: keyword,
      },
      NOT: {
        username: 'admin',
      },
    },
  });
  return users;
}
