import React from 'react'
import { Button } from './ui/button'
import { HiPlus } from 'react-icons/hi'

const UploadButton = () => {
  return (
    <Button className='space-x-1' >
    <HiPlus  size={15} />
      <span className=' font-semibold text-lg'>Upload</span>
    </Button>
  )
}

export default UploadButton