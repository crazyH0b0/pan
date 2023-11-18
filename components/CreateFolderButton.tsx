import React from 'react'
import { Button } from './ui/button'
import { FaRegFolder } from "react-icons/fa6";

const CreateFolderButton = () => {
  return (
    <Button variant={"outline"} className='space-x-1' >
  
  <FaRegFolder size={15} />
    <span className=' font-semibold text-lg'>Create folder</span>
  </Button>
  )
}

export default CreateFolderButton