"use client"

import { cn } from '@/lib/utils';
import { Member, Server, Profile, ChannelType } from '@prisma/client'
import { Hash, Video, Volume2, Crown, ShieldCheck } from "lucide-react";
import { useRouter, useParams } from 'next/navigation';
import React from 'react'
import { UserAvatar } from '@/components/user-avatar';

interface ServerMemberProps {
    member: Member & { profile: Profile };
    server: Server
}
  
const roleIconMap = {
    GUEST: null,
    MODERATOR: <ShieldCheck className="h-4 w-4 text-indigo-600" />,
    ADMIN: <Crown className="h-4 w-4 text-blue-600" />,
}; 

export const ServerMember = ({
 member,
 server
}: ServerMemberProps) => {
   const icon = roleIconMap[member.role]
   const router = useRouter();
   const params = useParams();

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  }

  return (
    <button onClick={onClick} className={cn(
        'group px-2 py-2 rounded-md flex items-center hover:bg-gray-300 dark:hover:bg-[#181b2b] gap-x-2 w-full mb-1 transition',
        params?.memberId === member.id && "text-primary dark:bg-[#181b2b] bg-gray-300 dark:text-zinc-200 dark:group-hover:text-white"
    )}>

       <UserAvatar src={member.profile.imageUrl} className='h-8 w-8'/>
       <p className={cn(
           "font-semibold text-sm text-gray-500 group-hover:text-gray-700 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
           params?.memberId === member.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white group-hover:text-slate-800"
           )}>
          {member.profile.name}
        </p>
        <span className='ml-auto'>{icon}</span>
    </button>
  )
}
