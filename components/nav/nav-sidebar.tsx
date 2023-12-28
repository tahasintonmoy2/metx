import { ModeToggle } from '@/components/mode-toggle';
import { NavActions } from "@/components/nav/nav-actions";
import { NavItem } from "@/components/nav/nav-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { UserButton } from '@clerk/nextjs';
import { redirect } from "next/navigation";

export const NavSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 pt-6 flex flex-col items-center h-full text-primary w-full dark:bg-[#181b2b]">
      <NavActions />
      <Separator
        className="h-[2px] bg-zinc-300 dark:bg-[#212333] rounded-md w-10 mx-auto"
      />
      <ScrollArea className="flex-1">
        {servers.map((server) => (
            <div key={server.id} className="mb-4">
              <NavItem id={server.id} imageUrl={server.imageUrl} name={server.name} />
            </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <Separator
        className="h-[2px] bg-zinc-300 dark:bg-[#212333] rounded-md w-10 mx-auto"
      />
        <UserButton afterSignOutUrl='/'/>
      </div>
    </div>
  );
};
