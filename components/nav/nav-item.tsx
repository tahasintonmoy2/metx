"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ActionHint } from "../action-hint";

interface NavItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export const NavItem = ({ id, imageUrl, name }: NavItemProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ActionHint description={`${name}`} side="right">
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute bg-primary bg-green-500 left-0 rounded-r-full transition-all w-1",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[15px] transition-all overflow-hidden",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[15px]"
          )}
        >
          <Image
            src={imageUrl}
            alt=""
            width={52}
            height={54}
            className="object-cover overflow-hidden"
          />
        </div>
      </button>
    </ActionHint>
  );
};
