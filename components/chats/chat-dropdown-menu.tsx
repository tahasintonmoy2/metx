import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { File } from "lucide-react";
import React from "react";

interface ChatDropdownMenuProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const ChatDropdownMenu = ({
 children,
 onClick
}: ChatDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="dark:bg-[#131622] dark:border-[#181b2b] dark:outline-none">
        <DropdownMenuItem onClick={onClick} className="dark:hover:bg-[#181b2b]">
          <File className="h-5 w-5 mr-2" />
          Upload Files
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
