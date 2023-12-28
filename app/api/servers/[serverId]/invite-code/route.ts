import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { v4 as uuid4v } from "uuid";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse("Server Id is missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuid4v(),
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log(`Server Error Id Invite: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
