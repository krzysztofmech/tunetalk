"use client";
import { Button } from "@/components/Button";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <>
      <Button
        handleClick={() =>
          signIn("spotify", {
            callbackUrl: "/dashboard",
          })
        }
        text="Login"
      />
    </>
  );
}
