"use client";

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/Theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/MainNav";

import { SessionProvider } from "next-auth/react";
import { AppWrapper } from "../app/context/Index";

const inter = Inter({ subsets: ["latin"] });

function getSessionFromHeader() {
  if (typeof window !== "undefined") {
    const session = window.localStorage.getItem("session");
    return session ? JSON.parse(session) : null;
  }
  return null;
}

export default function layout({ children }: { children: React.ReactNode }) {
  const session = getSessionFromHeader();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <AppWrapper>
              <nav className="flex flex-col justify-center items-center border-b">
                <div className="max-w-6xl w-full">
                  <MainNav />
                  <main className="flex flex-col items-center">
                    <div className="max-w-6xl w-full">
                      {children}
                      <Toaster />
                    </div>
                  </main>
                </div>
              </nav>
            </AppWrapper>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
