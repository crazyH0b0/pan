import { OurUploadDropzone } from '@/components/upload/pan-upload-dropzone';
import React from 'react'


const page = ({params}:{params:{folderId: string}}) => {
  console.log("params", params);
  
  return (
 
     
      <OurUploadDropzone></OurUploadDropzone>
      
  
   
  )
}

export default page