// import React from 'react'

// import UploadButton from '@/components/UploadButton';
// import CreateFolderButton from '@/components/CreateFolderButton';
// import { ScrollArea } from "@/components/ui/scroll-area"

// import { DataTableDemo } from '@/components/PanTable/data-table';


// const page = async () => {

//   return (
//     <div className='px-6 pt-4  w-full space-y-5  '>
//       <div className='flex-1 w-full p-0'>
//      <div className='space-x-4 '>
//     <UploadButton />
//     <CreateFolderButton />
//      </div>
// </div>
//     {/* <div className='flex justify-between items-center'>
//         <div className='text-muted-foreground text-xl'>All 10</div>
//         <div className='flex items-center gap-6'>
//           <SortAction />
//           <ReFresh/>
//         </div>
//     </div> */}

// <ScrollArea className="h-[560px]  rounded-md border p-4">

//     <DataTableDemo  />
// </ScrollArea>
   
//     </div>
//   )
// }

// export default page

import React from 'react'

import UploadButton from '@/components/UploadButton';
import CreateFolderButton from '@/components/CreateFolderButton';
import { ScrollArea } from "@/components/ui/scroll-area"

import { DataTableDemo } from '@/components/PanTable/data-table';


const page = async () => {

  return (

<ScrollArea className="h-[560px]  rounded-md border p-4">

    <DataTableDemo  />
</ScrollArea>
   
  )
}

export default page