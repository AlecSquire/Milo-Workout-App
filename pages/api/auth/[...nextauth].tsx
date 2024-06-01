import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Ensure environment variables are defined at runtime
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error("Missing Google OAuth environment variables");
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: clientId as string,
      clientSecret: clientSecret as string,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
