import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";

import { NavSidebar } from "@/components/nav/nav-sidebar";
import { ServerSidebar } from "@/components/servers/server-sidebar";
import { Menu } from "lucide-react";

export const MobileToggle = ({ 
  serverId 
}: { 
 serverId: string 
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="md:hidden block dark:text-white text-black mr-3">
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0">
        <div className="w-[72px]">
          <NavSidebar />
        </div>
        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
};
