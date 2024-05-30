"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { UserAuthForm } from "./UserAuthForm";
import MiloImage from "@/public/Milo2.png";
import { useToast } from "@/components/ui/use-toast";
export default function AuthenticationPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
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
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in or Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password below
              </p>
            </div>
            <UserAuthForm />
            {/* <p className="px-8 text-center text-sm text-muted-foreground">
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Follow this link to leave a review
              </Link>
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}
