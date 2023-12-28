import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { cn } from '@/lib/utils'
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ModalProvider } from '@/components/providers/modal-provider'
import { ourFileRouter } from '@/app/api/uploadthing/core'
import {Toaster} from 'sonner';
import { SocketProvider } from '@/components/providers/socket-provider'
import { QueryProvider } from '@/components/providers/query-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Metx',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(
          "dark:bg-[#0f111a] bg-white",
          inter.className
        )}>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)}/>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
           <SocketProvider>
            <Toaster position='top-center' richColors/>
            <ModalProvider />
            <QueryProvider>
              {children}
            </QueryProvider>
           </SocketProvider> 
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
