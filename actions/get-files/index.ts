'use server';
import prisma from '@/lib/prisma';

const typeMap = {
  list: undefined,
  image: 'jpg',
  music: 'mp4',
  video: 'mp4',
} as const;

type TypeMap = typeof typeMap;
type TypeMapKey = keyof TypeMap;

export const getFiles = async (panId: string, parentId: string, type: string) => {
  const fileType = type as TypeMapKey;
  if (!typeMap.hasOwnProperty(fileType)) {
    throw new Error('Invalid type specified');
  }
  const files = await prisma.file.findMany({
    where: {
      panId: panId,
      isDeleted: false,
      parentId: parentId,
      type: typeMap[fileType],
    },
  });

  return files;
};
