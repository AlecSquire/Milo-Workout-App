import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextResponse } from "next/server";
import { ServerResponse } from "http";

export async function middleware(req: any, res: ServerResponse) {
  const session = await getServerSession(req, res, authOptions);
  return NextResponse.next({
    headers: {
      "x-session": JSON.stringify(session || {}),
    },
  });
}

export const config = {
  matcher: "/",
};
