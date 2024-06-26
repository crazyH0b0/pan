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
import { getAllFiles } from '@/actions/get-all-files';
import { getFiles } from '@/actions/get-files';
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
      username: currentUser.username,
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
  //     parentId: slug[slug.length - 1],
  //   },
  // });

  // 获取文件
  let pId = '';

  const parentId = slug[slug.length - 1];
  const type = slug[0];

  if (parentId === 'list') {
    pId = parentId;
  } else {
    const splitId = parentId.split('%')[0];
    pId = splitId;
  }
  const files = await getFiles(pan.id, pId, type);

  return (
    <ScrollArea className="h-[560px] rounded-md border p-4">
      <DataTableDemo panId={pan.id} slug={slug} files={files} />
    </ScrollArea>
  );
};

export default page;
