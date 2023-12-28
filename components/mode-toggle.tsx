"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus-visible:ring-transparent dark:bg-slate-600 dark:border-none dark:shadow-md focus:outline-none">
        <Button variant="outline" size="icon" className="dark:bg-[#131622] dark:hover:bg-[#1f2236] bg-gray-300 hover:bg-gray-300/75">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="dark:bg-[#131622] border-none">
        <DropdownMenuItem onClick={() => setTheme("light")} className="dark:hover:bg-[#181b2b]">
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className="dark:hover:bg-[#181b2b]" onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem className="dark:hover:bg-[#181b2b]" onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
