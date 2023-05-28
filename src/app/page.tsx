"use client";
import { Button } from "@/components/Button";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import { Session } from "next-auth";
export default function Home() {
  const { data: session } = useSession();
  const [data, setData] = useState<Session | null>();

  return (
    <>
      {!session ? (
        <Button handleClick={() => signIn("spotify")} text="Login" />
      ) : (
        <>
          <div>{session.user?.name}</div>
          <img src={session.user?.image!} />
        </>
      )}
    </>
  );
}
