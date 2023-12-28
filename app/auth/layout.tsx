import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex mt-20 justify-center">
      {children}
    </div>
  );
};

export default layout;