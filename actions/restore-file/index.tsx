'use server';
import prisma from '@/lib/prisma';
import { getCookieCredential } from '@/utils/getCookieCredential ';
import { File } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const restoreFileAction = async (file: File) => {
  const user = await getCookieCredential();
  const pan = await prisma.pan.findUnique({
    where: {
      userId: user.id,
    },
  });
  const dbFile = await prisma.file.findUnique({
    where: {
      fileId: file.fileId,
      panId: pan?.id,
    },
  });

  if (!dbFile) throw new Error('文件或文件夹不存在');
  const fileToUpdate = await prisma.file.update({
    where: {
      fileId: file.fileId,
      panId: pan?.id,
    },
    data: {
      isDeleted: false,
    },
  });
  revalidatePath('/pan/trash');
  return fileToUpdate;
};
