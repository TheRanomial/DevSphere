// src/app/signin.tsx
"use client";
import { signIn, getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  const handleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center mt-24">
      <Button onClick={handleSignIn} className="px-40 py-20 text-6xl">
        Sign in with Google
      </Button>
    </div>
  );
}
