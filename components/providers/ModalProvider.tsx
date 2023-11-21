"use client"
import React from "react"
import CreateFolderModal from "../modals/create-folder-modal"

const ModalProvider = () => {
  const [isMounted, setIsMounted] = React.useState(false)
  React.useEffect(() => {
  

    setIsMounted(true)
  }, [])
  if(!isMounted) return
  return (
  <>
      <CreateFolderModal />

   
  </>  )
}

export default ModalProvider