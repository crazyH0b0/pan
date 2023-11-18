"use client"
import { UploadDropzone } from "@uploadthing/react";
 
import { OurFileRouter } from "../../app/api/uploadthing/core";
 
export const OurUploadDropzone = () => (
  <UploadDropzone<OurFileRouter, "imageUploader">
  className="w-full h-[300px] dark:border-dashed border border-red pb-2 
  ut-upload-icon:w-[200px]
  ut-label:dark:text-primary ut-label:font-bold
  ut-allowed-content:dark:text-foreground
  "

  endpoint="imageUploader"
    onClientUploadComplete={(res) => {
      // Do something with the response
      console.log("Files: ", res);
      alert("Upload Completed");
    }}
    onUploadError={(error: Error) => {
      alert(`ERROR! ${error.message}`);
    }}
    onUploadBegin={(name) => {
      // Do something once upload begins
      console.log("Uploading: ", name);
    }}
  />
);