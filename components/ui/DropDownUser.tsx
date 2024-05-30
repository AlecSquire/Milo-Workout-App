"use client";
import * as React from "react";
import { CameraIcon, Home, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useAppContext } from "@/app/context/Index";

export default function DropDownUser() {
  const { userData } = useAppContext();

  return (
    <div className="flex w-full flex-col items-start justify-between px-4 py-3 sm:flex-row sm:items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Image
              src={"/MiloB&W-modified.png"}
              width={80}
              height={80}
              alt={"logo of milo"}
              className="rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          {userData ? (
            <>
              <DropdownMenuItem>
                <div className="mr-2 h-4 w-4">{userData.name}</div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="mr-2 h-4 w-4">{userData.email}</div>
              </DropdownMenuItem>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Home className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <CameraIcon className="mr-2 h-4 w-4" />
                  Update Profile Photo
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Log Out
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuGroup>
            </>
          ) : (
            <DropdownMenuItem>
              <div>No user data</div>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
