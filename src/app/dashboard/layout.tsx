"use client";

import { AuthorizationContext } from "@/lib/userContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Sidebar from "./sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useContext(AuthorizationContext);
  const [loggedInComplete, setLogInComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user?.uid) {
      setLogInComplete(true);
      return;
    }
    // reroute to signup / signin
    router.push("/login");
  }, [user, loading]);
  return loggedInComplete ? (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      {children}
    </div>
  ) : (
    <div>Loading...</div>
  );
}
