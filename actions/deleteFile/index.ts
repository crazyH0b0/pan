import prisma from '@/lib/prisma';

export const deleteFile = async (userId: string, fileId: string) => {
  console.log(userId, fileId);
  console.log(123123);

  if (userId) {
    const res = await prisma.file.delete({
      where: {
        fileId,
        user: {
          id: userId,
        },
      },
    });
    console.log(res);
  }
};
