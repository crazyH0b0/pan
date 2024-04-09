import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const cookieStore = cookies();
  const currentUser = JSON.parse(cookieStore.get('user')?.value!) as User;
  const pan = await prisma.pan.findUnique({
    where: {
      userId: currentUser.id,
    },
  });
  let fileToCreate = null;
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const parentId = formData.get('parentId') as string;
    if (!file) return new NextResponse('Internal Error', { status: 500 });
    const type = file.name.split('.')[1];
    let response: any = await fetch('http://localhost:8090/hdfs/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      response = await response.json();
      const url = response.data.url;
      // const { code, message } = response;
      const code = 20000;
      if (code === 20000) {
        fileToCreate = await prisma.file.create({
          data: {
            name: file.name,
            panId: pan?.id as string,
            type,
            parentId: parentId,
            url,
            size: file.size,
          },
        });
        return NextResponse.json({ status: code, message: '上传成功', data: fileToCreate });
        // return NextResponse.json({ status: code, message });
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

// export async function DELETE(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const fileId = searchParams.get('fileId') as string;
//   const user = await currentUser();
//   if (!user) return new NextResponse('Unauthorized', { status: 401 });
//   const res = await prisma.file.delete({
//     where: {
//       fileId,
//       user: {
//         id: user.id,
//       },
//     },
//   });
//   console.log({ res });

//   return NextResponse.json({ status: 2000, message: '操作成功' });
//   // try {
//   //   const formData = await req.formData();
//   //   const file = formData.get('file') as File;
//   //   if (!file) return new NextResponse('Internal Error', { status: 500 });

//   //   const type = file.name.split('.')[1];
//   //   const user = await currentUser();

//   //   if (!user) return new NextResponse('Unauthorized', { status: 401 });
//   //   let response: any = await fetch('http://localhost:8090/hdfs/upload', {
//   //     method: 'POST',
//   //     body: formData,
//   //   });
//   //   if (response.ok) {
//   //     response = await response.json();
//   //     const { code, message } = response;
//   //     if (code === 20000) {
//   //       await prisma.file.create({
//   //         data: {
//   //           name: file.name,
//   //           userId: user.firstName || '用户2211',
//   //           url: 'www.baidu.com',
//   //           type,
//   //           parentId: '',
//   //         },
//   //       });
//   //       return NextResponse.json({ status: code, message });
//   //     } else {
//   //       return new NextResponse('Internal Error', { status: 500 });
//   //     }
//   //   } else {
//   //     return new NextResponse('Internal Error', { status: 500 });
//   //   }
//   // } catch (error) {
//   //   return new NextResponse('Internal Error', { status: 500 });
//   // }
// }
