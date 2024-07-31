'use client'

import { AuthorizationContext } from "@/lib/userContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  
  }>) {
    const {user, loading} = useContext(AuthorizationContext)
    const [loggedInComplete, setLogInComplete] = useState(false)
    const router = useRouter()

    useEffect(()=>{
        if (loading){
            return
        }
        if (user?.uid){
            setLogInComplete(true)
            return 
        }
        // reroute to signup / signin
        router.push('/login')

    }, [user, loading])
    return (
      loggedInComplete? children: <div>Loading...</div>
    );
  }
  