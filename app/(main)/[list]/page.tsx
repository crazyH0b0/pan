import React from 'react'


import { ScrollArea } from "@/components/ui/scroll-area"

import { DataTableDemo } from '@/components/PanTable/data-table';
import { currentUser, redirectToSignIn } from '@clerk/nextjs';
import prisma from '@/lib/prisma';


const page = async () => {
  // const user = await currentUser();
  // if(!user) return redirectToSignIn()
  // const dbUser = await prisma.user.findUnique({
  //   where:{
  //     id: user.id
  //   }
  // })
  // if (!dbUser) {
  //  await prisma.user.create({
  //   data: {
  //     id: user.id,
  //     username: `${user.firstName} ${user.lastName}`,
  //     imageUrl: user.imageUrl,
  //     email: user.emailAddresses[0].emailAddress
  //   }
  // });
  // }
  
  
  return (

<ScrollArea className="h-[560px]  rounded-md border p-4">

    <DataTableDemo  />
</ScrollArea>
   
  )
}

export default page