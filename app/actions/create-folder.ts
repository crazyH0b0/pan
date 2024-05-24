'use server';

import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function createFolder(folderName: string, parentId: string) {
  const cookieStore = cookies();
  const currentUser = JSON.parse(cookieStore.get('user')?.value!) as User;
  if (!currentUser) {
    throw new Error('User data or userId is missing in the cookie');
  }

  const pan = await prisma.pan.findUnique({
    where: {
      userId: currentUser.id,
    },
  });
  if (!pan) {
    throw new Error('Pan data not found for the user');
  }
  const folder = await prisma.file.create({
    data: {
      panId: pan.id,
      parentId,
      name: folderName,
      type: 'folder',
      size: 0,
    },
  });
  revalidatePath('/pan/list');
  return folder;
}
