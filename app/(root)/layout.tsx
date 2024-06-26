import Navbar from "@/components/navbar";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>
    <Navbar />
    {children}
    
    </div>;
};

export default RootLayout;
