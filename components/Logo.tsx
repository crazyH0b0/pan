import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href="/dashboard" className="flex items-center pl-3">
    <div className="relative  w-11 h-11  mr-4">
      <Image fill alt="Logo" src="/logo.png" />
    </div>
  </Link>

  )
}

export default Logo