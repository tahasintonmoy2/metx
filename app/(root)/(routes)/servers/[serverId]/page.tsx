import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

interface ServerIdProps {
  params:{
    serverId: string
  }
}

export default async function Home({
  params
}: ServerIdProps) {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where:{
      id: params.serverId,
      members:{
        some:{
          profileId: profile.id,
        }
      }
    },
    include:{
      channels:{
        where:{
          name: "general"
        },
        orderBy:{
          createdAt:"asc"
        }
      }
    }
  })

  const initialChannel = server?.channels[0];

  if (initialChannel?.name !== "general") {
    return notFound();
  }

  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`)
}
