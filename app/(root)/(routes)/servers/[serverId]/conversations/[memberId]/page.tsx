import { ChatHeader } from '@/components/chats/chat-header';
import { ChatInput } from '@/components/chats/chat-input';
import { ChatMessages } from '@/components/chats/chat-messages';
import { MediaRoom } from '@/components/media-room';
import { SocketIndicator } from '@/components/socket-indicator';
import { getOrCreateConversation } from '@/lib/conversation';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface MemberIdProps {
  params:{
    memberId: string,
    serverId: string,
  },
  searchParams: {
    video?: boolean,
    audio?: boolean,
  }
}

const MemberId = async({
 params,
 searchParams
}: MemberIdProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const currentMember = await db.member.findFirst({
    where:{
      serverId: params.serverId,
      profileId: profile.id
    },
    include:{
      profile: true,
    }
  });

  if (!currentMember) {
    return redirect("/")
  }

  const conversation = await getOrCreateConversation(currentMember.id, params.memberId);

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className='flex flex-col h-full'>
      <ChatHeader 
       imageUrl={otherMember.profile.imageUrl}
       name={otherMember.profile.name}
       serverId={params.serverId}
       type="conversation"
       connect={<SocketIndicator />}
      />
      {searchParams.video && (
        <MediaRoom 
          chatId={conversation.id}
          video={true}
          audio={true}
        />
      )}
      {!searchParams.video && searchParams.audio && (
        <MediaRoom 
          chatId={conversation.id}
          video={false}
          audio={true}
        />
      )}
      {!searchParams.video && !searchParams.audio && (
        <>
          <ChatMessages 
          member={currentMember}
          name={otherMember.profile.name}
          chatId={conversation.id}
          type='conversation'
          apiUrl='/api/direct-messages'
          paramKey="conversationId"
          paramValue={conversation.id}
          socketUrl='/api/socket/direct-messages'
          socketQuery={{
            conversationId: conversation.id,
          }}
          />
          <ChatInput 
          name={otherMember.profile.name}
          type='conversation'
          apiUrl='/api/socket/direct-messages'
          query={{
            conversationId: conversation.id
          }}
          />
        </>
      )}
    </div>
  )
}

export default MemberId