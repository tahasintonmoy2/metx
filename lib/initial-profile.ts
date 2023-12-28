import {currentUser, redirectToSignIn} from '@clerk/nextjs';
import { db } from '@/lib/db';

export const initalProfile =async () => {
    const user = await currentUser();

    if (!user) {
        return redirectToSignIn()
    }

    const profile = await db.profile.findUnique({
        where:{
            userId: user.id
        }
    });

    if (profile) {
        return profile;
    }

    const createProfile = await db.profile.create({
        data:{
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    });

    return createProfile;
}