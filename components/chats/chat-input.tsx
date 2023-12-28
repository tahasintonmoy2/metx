"use client";

import { ChatDropdownMenu } from "@/components/chats/chat-dropdown-menu";
import { IconPicker } from "@/components/emoji-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
}

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatInput = ({ 
  apiUrl, 
  name, 
  query, 
  type
}: ChatInputProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const { onOpen } = useModal();
  const router = useRouter();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });

      await axios.post(url, values);
      form.reset();
      router.refresh();
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <ChatDropdownMenu
                    onClick={() => onOpen("messageFile", { apiUrl, query })}
                  >
                    <button
                      type="button"
                      className="absolute top-10 left-8 h-[3rem] w-[3rem] mb-6 text-slate-600 dark:bg-transparent hover:text-gray-800 dark:hover:text-[#181b2b] transition rounded-md  flex items-center justify-self-center"
                    >
                      <PlusCircle className="dark:text-zinc-400 dark:hover:text-gray-200 h-6 w-6 " />
                    </button>
                  </ChatDropdownMenu>
                  <Input
                    disabled={isLoading}
                    className={cn(
                      "pl-14 py-6 dark:bg-[#1f2236] bg-gray-300 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-800 dark:text-zinc-200",
                      isLoading && "shadow-none dark:text-gray-500 cursor-not-allowed"
                    )}
                    placeholder={`Message ${
                      type === "conversation" ? name : "#" + name
                    }`}
                    {...field}
                  />
                  <div className=" absolute top-[3.3rem] right-8">
                    <IconPicker
                      onChange={(emoji: any) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
