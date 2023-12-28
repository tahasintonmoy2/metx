"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogOut, User2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { SignOutButton, useClerk, useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { useState } from "react";

export const UserProfileButton = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [position, setPosition] = useState("system");
  const { setTheme } = useTheme();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center text-sm pl-12 pr-4 md:pr-2 md:pl-2">
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-90 dark:bg-[#131622] group dark:border-[#181b2b]"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <p className="text-xs ml-3 font-medium leading-none">
              {user?.fullName}
            </p>
          </div>
          <p className="text-xs font-medium leading-none dark:text-gray-400 text-muted-foreground">
            {user?.emailAddresses[0].emailAddress}
          </p>
        </div>
        <DropdownMenuSeparator className="bg-zinc-300 dark:bg-[#212333]" />
        <DropdownMenuItem className="w-full flex dark:hover:bg-[#181b2b] text-gray-600 dark:text-white justify-start focus-visible:ring-transparent focus:outline-none">
          <User2 className="h-5 w-5 mr-2" />
          Profile
          <DropdownMenuShortcut>⇧P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className="w-full py-0 px-0 flex dark:hover:bg-[#181b2b] text-gray-600 dark:text-white justify-start focus-visible:ring-transparent focus:outline-none">
          <SignOutButton>
            <Button
              onClick={() => signOut(() => router.push("/"))}
              variant="ghost"
              size="sm"
              className="cursor-default w-full dark:hover:bg-[#181b2b] flex items-center justify-start"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
