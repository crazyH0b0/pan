import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) return new NextResponse('Internal Error', { status: 500 });

    const type = file.name.split('.')[1];
    const user = await currentUser();

    if (!user) return new NextResponse('Unauthorized', { status: 401 });
    let response: any = await fetch('http://localhost:8090/hdfs/upload', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      response = await response.json();
      const { code, message } = response;
      if (code === 20000) {
        await prisma.file.create({
          data: {
            name: file.name,
            userId: user.firstName || '用户2211',
            url: 'www.baidu.com',
            type,
            parentId: '',
          },
        });
        return NextResponse.json({ status: code, message });
      } else {
        return new NextResponse('Internal Error', { status: 500 });
      }
    } else {
      return new NextResponse('Internal Error', { status: 500 });
    }
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get('fileId') as string;
  const user = await currentUser();
  if (!user) return new NextResponse('Unauthorized', { status: 401 });
  const res = await prisma.file.delete({
    where: {
      fileId,
      user: {
        id: user.id,
      },
    },
  });
  console.log({ res });

  return NextResponse.json({ status: 2000, message: '操作成功' });
  // try {
  //   const formData = await req.formData();
  //   const file = formData.get('file') as File;
  //   if (!file) return new NextResponse('Internal Error', { status: 500 });

  //   const type = file.name.split('.')[1];
  //   const user = await currentUser();

  //   if (!user) return new NextResponse('Unauthorized', { status: 401 });
  //   let response: any = await fetch('http://localhost:8090/hdfs/upload', {
  //     method: 'POST',
  //     body: formData,
  //   });
  //   if (response.ok) {
  //     response = await response.json();
  //     const { code, message } = response;
  //     if (code === 20000) {
  //       await prisma.file.create({
  //         data: {
  //           name: file.name,
  //           userId: user.firstName || '用户2211',
  //           url: 'www.baidu.com',
  //           type,
  //           parentId: '',
  //         },
  //       });
  //       return NextResponse.json({ status: code, message });
  //     } else {
  //       return new NextResponse('Internal Error', { status: 500 });
  //     }
  //   } else {
  //     return new NextResponse('Internal Error', { status: 500 });
  //   }
  // } catch (error) {
  //   return new NextResponse('Internal Error', { status: 500 });
  // }
}
