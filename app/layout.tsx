import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/MainNav";
import ChatBot from "./ChatBot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Milo - progressive overload app ",
  description: "Generated by Alec Squire",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="flex flex-col justify-center items-center border-b">
            <div className="max-w-6xl w-full">
              <MainNav />
              <main className="flex flex-col items-center">
                <div className="max-w-6xl w-full">{children}</div>
              </main>
            </div>
          </nav>
          <ChatBot />
        </ThemeProvider>
      </body>
    </html>
  );
}