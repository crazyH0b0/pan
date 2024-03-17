import { OurUploadDropzone } from '@/components/upload/pan-upload-dropzone';
import prisma from '@/lib/prisma';
import { currentUser, redirectToSignIn } from '@clerk/nextjs';
import React from 'react';

const page = async ({ params }: { params: { folderId: string } }) => {
  // const user = await currentUser();
  // const folder = await prisma.folder.findUnique({
  //   where: {
  //     id: params.folderId,
  //   },
  // });
  // if (!folder) return null;
  // if (!user) return redirectToSignIn();
  // const dbUser = await prisma.user.findUnique({
  //   where: {
  //     id: user.id,
  //   },
  // });
  const onUpload = async (url: string) => {
    // await prisma.file.create({
    //   data:{
    //     folderId: folder?.id,
    //     name: "test",
    //     fileType: "image",
    //     src: url
    //   }
    // })
  };
  return 1;
  // return <OurUploadDropzone />;
};

export default page;
