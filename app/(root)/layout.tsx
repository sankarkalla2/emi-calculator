import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/providers/them-provider";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ThemeProvider
        enableSystem
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
      >
        <Navbar />
        {children}
      </ThemeProvider>
    </div>
  );
};

export default RootLayout;
