import React from 'react';
import ShareTable from './share-table';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { User } from '@prisma/client';

const SharePage = async () => {
  const cookieStore = cookies();
  const currentUser = JSON.parse(cookieStore.get('user')?.value!) as User;
  const pan = await prisma.pan.findUnique({
    where: {
      userId: currentUser.id,
    },
  });
  const sharedFiles = await prisma.share.findMany({
    where: {
      shareLink: {
        not: null,
      },
    },
    include: {
      file: true,
    },
  });
  return <ShareTable files={sharedFiles} />;
};

export default SharePage;
