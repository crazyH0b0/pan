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
