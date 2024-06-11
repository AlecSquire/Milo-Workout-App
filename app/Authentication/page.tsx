import { cn } from "@/lib/utils";
import Image from "next/image";
import { UserAuthForm } from "./UserAuthForm";
import MiloImage from "@/public/Milo2.png";

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative flex-col items-center justify-center md:grid md:min-h-screen lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-[#F38523]" />
          <div className="relative z-20 flex items-center justify-center h-full w-full text-lg font-medium">
            <div className="relative h-full w-full">
              <Image
                src={MiloImage}
                alt="Milo artwork carrying a bull"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center p-8 md:min-h-screen">
          <div className="mx-auto w-full max-w-md space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in or Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password below
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
