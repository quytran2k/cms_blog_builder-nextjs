"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./button";
import ImageRenderer from "./image-renderer";
import { ModeToggle } from "./toggle-theme";

interface IPropsAuthHeader {}

const AuthHeader = ({}: IPropsAuthHeader) => {
  const { data: session } = useSession();

  return (
    <div className="px-60 py-4 flex items-center justify-between">
      <ImageRenderer src="/assets/images/logoApp.webp" width={50} height={40} />
      <div className="flex gap-2 items-center">
        {session ? (
          <Button onClick={() => signOut()}>Logout</Button>
        ) : (
          <Link href="/login">Login</Link>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default AuthHeader;
