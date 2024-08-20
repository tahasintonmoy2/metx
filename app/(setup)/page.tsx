import { InitialModal } from '@/components/models/initial-modal';
import { db } from '@/lib/db';
import { initalProfile } from '@/lib/initial-profile'
import { redirect } from 'next/navigation';
import React from 'react'

const Setup = async () => {
  const profile = await initalProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return (
    <InitialModal />
  )
}

export default Setup