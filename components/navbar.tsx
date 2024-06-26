import Image from "next/image";
import React from "react";
import { ModeToggle } from "./theme-toggle";
import Link from "next/link";
import UserButton from "./user-button";
import { Button } from "./ui/button";
import { auth } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className="fixed w-full top-0  backdrop-filter backdrop-blur-lg bg-opacity-30 border-b shadow-sm z-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <span className="text-2xl font-semibold relative w-24 h-full">
            <Link href={"/"}>
              <Image src={"/logoipsum-332.svg"} alt="logo" fill />
            </Link>
          </span>
          <nav className="flex space-x-4 justify-center">
            <ModeToggle />
            {!session?.user ? (
              <Button variant={"outline"}>
                <Link href={"/sign-in"} className="hover:underline">
                  Login
                </Link>
              </Button>
            ) : (
              <UserButton
                imageUrl={session.user.image || ""}
                name={session.user.name || ""}
              />
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
