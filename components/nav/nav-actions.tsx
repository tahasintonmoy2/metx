"use client"

import { ActionHint } from '@/components/action-hint'
import { useModal } from '@/hooks/use-modal';
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react';

export const NavActions = () => {
    const [isMounted, setIsMounted] = useState(false);
    const {onOpen} = useModal();

    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    if (!isMounted) {
      return null;
    }

  return (
    <div>
     <ActionHint description='Create new server' side='right' className='hidden md:block'>
        <button className='group' onClick={() => onOpen("createServer")}>
        <div className='flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[15px] transition-all overflow-hidden items-center justify-center bg-gray-200 dark:bg-slate-600 group-hover:bg-green-500'>
            <Plus size={25} className='group-hover:text-white transition text-green-500'/>
        </div>
        </button>
     </ActionHint>
    </div>
  )
}
