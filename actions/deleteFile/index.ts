'use server';
import prisma from '@/lib/prisma';
import { File, User } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const deleteFile = async (files: File[]) => {
  const cookieStore = cookies();
  const currentUser = JSON.parse(cookieStore.get('user')?.value!) as User;
  const pan = await prisma.pan.findUnique({
    where: {
      userId: currentUser.id,
    },
  });
  let res = null;
  const ids = files.map((file) => file.fileId);
  if (currentUser) {
    try {
      res = await prisma.file.updateMany({
        where: {
          fileId: {
            in: ids,
          },
          panId: pan?.id,
        },
        data: {
          isDeleted: true,
        },
      });
      revalidatePath('/pan/list');
    } catch (error) {
      throw new Error('出错了~');
    }
  }
  return res;
};

export const recoverFile = async (files: File[]) => {
  const cookieStore = cookies();
  const currentUser = JSON.parse(cookieStore.get('user')?.value!) as User;
  const pan = await prisma.pan.findUnique({
    where: {
      userId: currentUser.id,
    },
  });
  let res = null;
  const ids = files.map((file) => file.fileId);
  if (currentUser) {
    try {
      res = await prisma.file.updateMany({
        where: {
          fileId: {
            in: ids,
          },
          panId: pan?.id,
        },
        data: {
          isDeleted: false,
        },
      });
      revalidatePath('/pan/list');
      revalidatePath('/pan/trash');
    } catch (error) {
      throw new Error('出错了~');
    }
  }
  return res;
};
