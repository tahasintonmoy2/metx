import { NavSidebar } from '@/components/nav/nav-sidebar'
import React from 'react'

const Rootlayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className='h-full'>
     <div className='hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0'>
      <NavSidebar />
     </div> 
      <main className='md:pl-[72px] h-full'>
        {children}
      </main>
    </div>
  )
}

export default Rootlayout