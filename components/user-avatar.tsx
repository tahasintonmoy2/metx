import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { User2 } from "lucide-react";

interface UserAvatarProps {
  src: string;
  className?: string;
}

export const UserAvatar = ({ 
   src,
   className
}: UserAvatarProps) => {
  return (
    <Avatar className={cn(
        "h-7 w-7",
        className
    )}>
      <AvatarImage src={src} />
      <AvatarFallback className="overflow-hidden dark:bg-slate-300">
        <User2 className="h-5 w-5 text-black"/>
      </AvatarFallback>
    </Avatar>
  );
};
