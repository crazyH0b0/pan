"use server"
import prisma from '@/lib/prisma';
import { File, User } from '@prisma/client';
import { cookies } from 'next/headers';

export const deleteFile = async ( file: File) => {
  const cookieStore = cookies();
  const currentUser = JSON.parse(cookieStore.get('user')?.value!) as User;
  const pan = await prisma.pan.findUnique({
    where: {
      userId: currentUser.id,
    },
  });
  let res = null
  if (currentUser) {
    res = await prisma.file.update({
      where: {
        fileId: file.fileId,
        panId: pan?.id,
        parentId: file.parentId
      },
      data: {
        isDeleted: true
      }
    });
  }
  return res
};
