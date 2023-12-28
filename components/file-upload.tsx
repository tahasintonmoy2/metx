"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";
import Image from "next/image";
import { FileIcon, X } from "lucide-react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endPoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({
  onChange,
  value,
  endPoint
}: FileUploadProps) => {
  const fileType = value.split(".").pop();

  if (value && fileType !== "pdf" && "video") {
    return (
      <div className="relative h-20 w-20">
        <Image src={value} alt="" fill className="rounded-full object-cover" />
        <button
          onClick={() => onChange("")}
          className="bg-red-600 focus-visible:outline-none focus:border-0 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-blue-200">
        <FileIcon className="h-10 w-10 fill-blue-600 stroke-blue-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-blue-600 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-red-600 focus-visible:outline-none focus:border-0 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endPoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
      }}
    />
  );
};
