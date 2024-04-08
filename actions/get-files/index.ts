'use server';
import prisma from '@/lib/prisma';

const typeMap = {
  list: undefined,
  image: ['jpg', 'png', 'jpeg'],
  music: ['mp3'],
  video: ['mp4', 'vimeo'],
  text: ['txt', 'pdf', 'docx', 'doc'],
};

export const getFiles = async (panId: string, parentId: string, type: string) => {
  // const types = Object.keys(typeMap);
  let filteredParentId = type !== 'list' ? undefined : parentId;
  let isDeleted = type === 'trash' ? true : false;
  const files = await prisma.file.findMany({
    where: {
      panId: panId,
      isDeleted: isDeleted,
      parentId: filteredParentId,
      type: { in: typeMap[type] },
    },
  });

  return files;
};
