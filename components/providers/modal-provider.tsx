"use client"

import { AcceptInviteModal } from "@/components/models/accept-invite-modal";
import { CreateChannelModal } from "@/components/models/create-channel-modal";
import { CreateServerModal } from "@/components/models/create-server-modal";
import { EditServerModal } from "@/components/models/edit-server-modal";
import { InviteModal } from "@/components/models/invite-modal";
import { LeaveServerModal } from "@/components/models/leave-server-modal";
import { DeleteServerModal } from "@/components/models/delete-server-modal";
import { DeleteChannelModal } from "@/components/models/delete-channel-modal";
import { DeleteMessageModal } from "@/components/models/delete-message-modal";
import { EditChannelModal } from "@/components/models/edit-channel-modal";
import { MessageFileModal } from "@/components/models/message-file-modal";
import { MembersModal } from "@/components/models/members-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if (!isMounted) {
        return null;
    }

  return (
    <>
        <CreateServerModal />
        <InviteModal />
        <EditServerModal />
        <EditChannelModal />
        <MembersModal />
        <MessageFileModal />
        <CreateChannelModal />
        <LeaveServerModal />
        <DeleteServerModal />
        <DeleteChannelModal />
        <DeleteMessageModal />
        <AcceptInviteModal />
    </>
  )
}
