"use server"

import prisma from "@/lib/prisma";
import { File } from "@prisma/client";

export async function genShareCode (file: File) {
  const fileShareCodeExists = await prisma.share.findUnique({
    where: {
      fileId: file.fileId
    }
  })
  if(!fileShareCodeExists){
    const genSharedCode = crypto.randomUUID()
    const share = await prisma.share.create({
      data: {
        shareLink: genSharedCode,
        fileId: file.fileId
      }
    })
    return share.shareLink
  }
  return fileShareCodeExists.shareLink
}


export async function updateShareCode (file: File) {  
  const fileShareCodeExists = await prisma.share.update({
    where: {
      fileId: file.fileId
    },
    data: {
      shareLink: crypto.randomUUID()
    }
  })
  
  return fileShareCodeExists.shareLink
}
