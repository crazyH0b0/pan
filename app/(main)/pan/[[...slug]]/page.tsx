import React from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { FaFolder } from 'react-icons/fa';
import { currentUser, redirectToSignIn } from '@clerk/nextjs';
import prisma from '@/lib/prisma';
import dynamic from 'next/dynamic';
import AsyncCp from '@/components/PanTable/AsyncCp';

import DataTableDemo from '@/components/PanTable/data-table';
import { Prisma, User } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import useFilesStore, { setFiles } from '@/store/use-files';
// const AsyncDataTable = React.lazy(() => import('@/components/PanTable/data-table'));
// const Dashboard = dynamic(() => import('@/components/PanTable/data-table'), {
//   suspense: true,
//   ssr: false,
// });

const page = async ({ params }: { params: { slug: string[] } }) => {
  const slug = params.slug;
  const cookieStore = cookies();
  const currentUser = JSON.parse(cookieStore.get('user')?.value!) as User;  
  let dbUser = null;
  
  dbUser = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
      username: currentUser.username
    },
  });
  
  if (!currentUser || !dbUser) return redirect('/login');
  const pan = (await prisma.pan.findUnique({
    where: {
      userId: dbUser.id,
    },
  })) as any;

  // const files = await prisma.file.findMany({
  //   where: {
  //     panId: pan.id,
  //     isDeleted: false,
  //     parentId: slug.join('/'),
  //   },
  // });
  
  return (
    <ScrollArea className="h-[560px] rounded-md border p-4">
      <DataTableDemo panId={pan.id} slug={slug} />
    </ScrollArea>
  );
};

export default page;
