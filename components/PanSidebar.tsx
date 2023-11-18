import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { FaRegFolder } from "react-icons/fa";


const PanSidebar = () => {
  return (
    <div className='flex  flex-col items-center h-full border-r shadow text-primary w-[200px]  px-3 py-2  bg-background'>
        <Button
              asChild
              variant="secondary"
              className="w-full justify-start flex gap-2 font-semibold"
            >
            
              <Link href="/list">
              <FaRegFolder  size={20}/>

                All
              </Link>
           

            </Button>
      {/* <Link className='' href={"/list"}>All</Link>
      <Link href={"/list"} className='flex  ' >
        <span>All</span>
      </Link> */}
    </div>
  )
}

export default PanSidebar