import React from 'react'
import { IoRefreshSharp } from "react-icons/io5";
import { Button } from './ui/button';
const ReFresh = () => {
  return (
    <Button variant="ghost" size="icon">
      <IoRefreshSharp size={25} />
    </Button>
  )
}

export default ReFresh