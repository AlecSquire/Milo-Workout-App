"use client";

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/Theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/MainNav";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
        <SpeedInsights />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <AppWrapper>
              <div className="flex justify-center">
                <div className="transform origin-top scale-95 w-full max-w-6xl">
                  <nav className="flex flex-col justify-center items-center border-b">
                    <div className="w-full">
                      <MainNav />
                      <main className="flex flex-col items-center">
                        <div className="w-full">
                          {children}
                          <Toaster />
                        </div>
                      </main>
                    </div>
                  </nav>
                </div>
              </div>
            </AppWrapper>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
