"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "/public/assets/logo.png";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/ModeToggle";
import { useContext } from "react";
import { AuthorizationContext } from "@/lib/userContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/firebase/auth";
import { CircleUser } from "lucide-react";

const Navbar = () => {
  const { user, loading } = useContext(AuthorizationContext);
  return (
    <nav className=" top-0 py-3 z-[1000]">
      <div className="container pl-4 pr-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <Link href="/" className="hover:cursor-pointer">
            <Image
              src={Logo}
              alt="Logo"
              className="h-8 w-auto ml-4 md:ml-28 mt-4 cursor-pointer"
            />
          </Link>
          {user !== undefined && user !== null ? (
            <div className="flex flex-row-reverse items-center gap-6 px-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full overflow-hidden"
                  >
                    {user?.photoURL ? (
                      <Image
                        className="h-10 w-10"
                        height={50}
                        width={50}
                        alt="profile-image"
                        src={user?.photoURL}
                      ></Image>
                    ) : (
                      <CircleUser className="h-5 w-5" />
                    )}
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href={`/dashboard`} className=" text-blue-600 hover:animate-pulse hover:underline px-2 py-2 rounded-2xl">Dashboard</Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4 mt-4">
              <Button variant="link" className="text-imagine-blue">
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="default" className="bg-imagine-secondary transition-colors duration-300  hover:bg-orange-600">
                <Link href="/signup">Sign up</Link>
              </Button>
              <ModeToggle />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
