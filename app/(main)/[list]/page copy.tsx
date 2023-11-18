import React from 'react'
import { promises as fs } from "fs"
import path from "path"
import { z } from "zod"
import UploadButton from '@/components/UploadButton';
import CreateFolderButton from '@/components/CreateFolderButton';
import SortAction from '@/components/SortAction';
import ReFresh from '@/components/ReFresh';
import { DataTable } from '@/components/PanTable/data-table';
import { taskSchema } from '@/data/schema';
import { columns } from '@/components/PanTable/columns';
// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "/data/tasks.json")
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

const page = async () => {
  const tasks = await getTasks()
  return (
    <div className='px-6 pt-4  w-full space-y-5  '>
      <div className='flex-1 w-full p-0'>
     <div className='space-x-4 '>
    <UploadButton />
    <CreateFolderButton />
     </div>
</div>
    {/* <div className='flex justify-between items-center'>
        <div className='text-muted-foreground text-xl'>All 10</div>
        <div className='flex items-center gap-6'>
          <SortAction />
          <ReFresh/>
        </div>
    </div> */}

    <div className="  py-10">
    <DataTable data={tasks} columns={columns} />
    </div>
    </div>
  )
}

export default page