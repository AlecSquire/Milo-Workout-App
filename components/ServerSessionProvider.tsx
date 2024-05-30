import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface ServerSessionProviderProps {
  children: ReactNode;
}

export default async function ServerSessionProvider({
  children,
}: ServerSessionProviderProps) {
  const session = await getServerSession(authOptions);
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
