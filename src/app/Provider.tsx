"use client";

import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/app/Header";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
