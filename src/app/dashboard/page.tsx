"use client";
import React, { useEffect } from "react";
import { me, user } from "@/queries/user";
import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

interface PageProps {}
const Page: NextPage<PageProps> = () => {
  const { data, loading } = useQuery(me, {});

  return <>{data?.me?.name}</>;
};

export default Page;
