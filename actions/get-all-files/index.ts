'use server';
import prisma from '@/lib/prisma';

// 定义一个异步函数来查询所有的 File
export async function getAllFiles(keyword: string) {
  // 使用 Prisma Client 的 findMany 方法来查询所有的 File
  const allFiles = await prisma.file.findMany({
    where: {
      name: {
        contains: keyword, // 使用 contains 进行模糊查询
      },
      NOT: {
        type: 'folder',
      },
    },
    include: {
      pan: {
        include: {
          user: true,
        },
      },
    },
  });

  return allFiles;
}
