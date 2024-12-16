"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const AuthenticatedPage = ({ children }: Props) => {
  const router = useRouter();
  const { ready, authenticated } = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) router.push("/login");
  }, [ready, authenticated, router]);

  return <div>{children}</div>;
};

export default AuthenticatedPage;
