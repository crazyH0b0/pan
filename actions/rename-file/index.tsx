'use server';
import prisma from '@/lib/prisma';
import { getCookieCredential } from '@/utils/getCookieCredential ';
import { File } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const renameFileAction = async (file: File, newName: string) => {
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
  if (file.type !== 'folder') {
    const formData = new FormData();
    formData.append('userId', user.id);
    formData.append('oldFileName', file.name);
    formData.append('newFileName', newName);
    await fetch('http://localhost:8090/hdfs/rename', {
      method: 'POST',
      body: formData,
    });
    const url = dbFile.url || '';
    // 从URL中提取文件名
    const fileNameStartIndex = url.lastIndexOf('/') + 1;
    const fileNameEndIndex = url.indexOf('?'); // 文件名结束的位置是问号的位置
    const fileName = url.substring(fileNameStartIndex, fileNameEndIndex);
    const newUrl = url.replace(fileName, newName);

    await prisma.file.update({
      where: {
        fileId: file.fileId,
        panId: pan?.id,
      },
      data: {
        name: newName,
        url: newUrl,
      },
    });
  }

  const fileToUpdate = await prisma.file.update({
    where: {
      fileId: file.fileId,
      panId: pan?.id,
    },
    data: {
      name: newName,
    },
  });
  revalidatePath('/pan/settings');
  revalidatePath('/pan/list');
  revalidatePath('/pan/image');
  revalidatePath('/pan/video');
  revalidatePath('/pan/music');
  revalidatePath('/pan/code');
  revalidatePath('/pan/trash');
  return fileToUpdate;
};
