'use server';
import prisma from '@/lib/prisma';
import { getCookieCredential } from '@/utils/getCookieCredential ';

export async function getFileSizeAction() {
  const user = await getCookieCredential();
  const files = await prisma.file.findMany({
    where: {
      pan: {
        userId: user.id,
      },
    },
    select: {
      size: true,
    },
  });
  // 计算文件大小总和
  const totalSize = files.reduce((acc, file) => acc + file.size, 0);
  return totalSize;
}

export async function updateSpaceAction() {
  const user = await getCookieCredential();
  const pan = await prisma.pan.findFirst({
    where: {
      userId: user.id,
    },
  });
  await prisma.settings.update({
    where: {
      panId: pan?.id,
    },
    data: {
      capacity: 5,
    },
  });
  const files = await prisma.file.findMany({
    where: {
      pan: {
        userId: user.id,
      },
    },
    select: {
      size: true,
    },
  });
  // 计算文件大小总和
  const totalSize = files.reduce((acc, file) => acc + file.size, 0);
  return totalSize;
}

export async function getCapacity() {
  const user = await getCookieCredential();
  const pan = await prisma.pan.findFirst({
    where: {
      userId: user.id,
    },
  });
  const settings = await prisma.settings.findFirst({
    where: {
      panId: pan?.id,
    },
  });
  const capacity = settings?.capacity || 3;
  // 计算文件大小总和
  return capacity;
}
