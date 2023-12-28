"use client";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useServerModal } from "@/hooks/use-server-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Server name is required",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required",
  }),
});

export const InitialModal = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const serverModal = useServerModal();
  const onOpen = useServerModal((state) => state.onOpen);
  const isOpen = useServerModal((state) => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/servers", values);

      form.reset();
      router.refresh();
      window.location.reload();
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Customize your server"
      description="Give your server a personality with a name and an image. You can
     always change it later."
      isOpen={serverModal.isOpen}
      onClose={serverModal.onClose}
    >
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="space-y-6 px-6">
            <div className="flex items-center justify-center text-center">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        endPoint="serverImage"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase font-bold">
                    Server name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-zinc-300/50 placeholder-slate-900 text-black border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Server name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    <p className="text-gray-500">
                      Server name much be 4 character or higher
                    </p>
                  </FormDescription>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter className="bg-gray-200 px-6 py-4">
            <Button variant="primary" disabled={isLoading}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </Modal>
  );
};
