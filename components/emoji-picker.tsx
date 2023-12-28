"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { Smile } from "lucide-react";
import { useTheme } from "next-themes";

interface IconPickerProps {
  onChange: (value: string) => void;
}

export const IconPicker = ({ 
  onChange
}: IconPickerProps) => {
  const { resolvedTheme } = useTheme();
  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;

  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };

  const theme = themeMap[currentTheme];

  const previewConfig = {
    showPreview: false,
    showEmoji: true,
    showCategory: true,
  };
  
  return (
    <Popover>
      <PopoverTrigger>
        <Smile className="dark:text-zinc-400 text-slate-600 hover:text-gray-800 transition dark:hover:text-gray-200" />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
      >
        <EmojiPicker
          height={460}
          skinTonesDisabled={true}
          previewConfig={previewConfig}
          emojiStyle={EmojiStyle.FACEBOOK}
          theme={theme}
          onEmojiClick={(data) => onChange(data.emoji)}
        />
      </PopoverContent>
    </Popover>
  );
};
