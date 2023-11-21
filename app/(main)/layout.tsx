import PanHeader from '@/components/PanHeader'
import PanSidebar from '@/components/PanSidebar'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  
  return (
    <div className='flex overflow-hidden flex-col min-h-screen min-w-full bg-background max-h-screen'>
      <PanHeader />
       
    <main className='flex w-full flex-1 h-full'>
      
     <div className='flex flex-1'>
     <PanSidebar />
      {children}
     </div>
     
      </main>
    </div>
 
  )
}

export default layout