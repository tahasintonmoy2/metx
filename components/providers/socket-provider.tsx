"use client";

import React, { 
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { io as ClientIO } from "socket.io-client";

type SocektContextType = {
  socket: any | null;
  isConnected: boolean;
  isOnline: boolean;
};

const SoceketContext = createContext<SocektContextType>({
  socket: null,
  isConnected: false,
  isOnline: false
});

export const useSocket = () => {
  return useContext(SoceketContext);
};

export const SocketProvider = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const socketInstance = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_SITE_URL!,
      {
        path: "/api/socket/io",
        addTrailingSlash: false,
      }
    );

    socketInstance.on("connect", () => {
      setIsConnected(true);
      setIsOnline(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
      setIsOnline(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(()=>{
      setIsMounted(true)
  },[])

  if (!isMounted) {
      return null;
  }

  return (
    <SoceketContext.Provider value={{ socket, isConnected, isOnline }}>
      {children}
    </SoceketContext.Provider>
  );
};
