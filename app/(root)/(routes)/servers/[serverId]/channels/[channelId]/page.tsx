import { ChatHeader } from "@/components/chats/chat-header";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { SocketIndicator } from '@/components/socket-indicator';
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChatInput } from "@/components/chats/chat-input";
import { ChatMessages } from "@/components/chats/chat-messages";
import { ChannelType } from "@prisma/client";
import { MediaRoom } from "@/components/media-room";
import { OnlineStatus } from "@/components/online-status";

interface ChannelIdProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelId = async ({ params }: ChannelIdProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    redirect("/");
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
        connect={<SocketIndicator />}
        online={<OnlineStatus />}
      />
      {channel.type === ChannelType.TEXT && (
        <>
        <ChatMessages 
          member={member}
          name={channel.name}
          type="channel"
          apiUrl="/api/messages"
          socketUrl="/api/socket/messages"
          socketQuery={{
            channelId: channel.id,
            serverId: channel.serverId
          }}
          paramKey="channelId"
          paramValue={channel.id}
          chatId={channel.id}
        />
        <ChatInput 
          name={channel.name}
          type="channel"
          apiUrl="/api/socket/messages"
          query={{
            channelId: channel.id,
            serverId: channel.serverId
          }}
        />
        </>
      )}
      {channel.type === ChannelType.AUDIO && (
        <MediaRoom 
         chatId={channel.id}
         video={false}
         audio={true}
        />
      )}
      {channel.type === ChannelType.VIDEO && (
        <MediaRoom 
         chatId={channel.id}
         video={true}
         audio={true}
        />
      )}
    </div>
  );
};

export default ChannelId;
