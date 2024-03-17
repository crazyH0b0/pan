import React from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { FaFolder } from 'react-icons/fa';
import { currentUser, redirectToSignIn } from '@clerk/nextjs';
import prisma from '@/lib/prisma';
import dynamic from 'next/dynamic';
import AsyncCp from '@/components/PanTable/AsyncCp';

import DataTableDemo from '@/components/PanTable/data-table';
import { Prisma } from '@prisma/client';
// const AsyncDataTable = React.lazy(() => import('@/components/PanTable/data-table'));
// const Dashboard = dynamic(() => import('@/components/PanTable/data-table'), {
//   suspense: true,
//   ssr: false,
// });

const page = async () => {
  const user = await currentUser();
  let dbUser = null;
  if (!user) return redirectToSignIn();
  dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  // if (!dbUser) {
  //   dbUser = await prisma.user.create({
  //     data: {
  //       username: user?.username || 'undefined',
  //       id: user.id,
  //     },
  //   });
  // }
  const files = await prisma.file.findMany({
    where: {
      // type: 'folder',
      // parentId: '',
      // userId: dbUser.id,
    },
  });

  return (
    <ScrollArea className="h-[560px] rounded-md border p-4">
      <DataTableDemo files={files} />
    </ScrollArea>
  );
};

export default page;
