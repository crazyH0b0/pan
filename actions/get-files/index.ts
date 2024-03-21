"use server"
import prisma from '@/lib/prisma';

export const getFiles = async ( panId: string,parentId:string) => {
  const files = await prisma.file.findMany({
    where: {
      panId:panId,
      isDeleted: false,
      parentId: parentId ,
    },
  });
  
  return files
};
