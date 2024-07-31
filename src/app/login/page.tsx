"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/ui/ModeToggle";
import Logo from '/public/assets/logo.png'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import GoogleLogo from '/public/assets/google_icon.svg'
import PlaceholderImage from '/public/assets/jobrec.svg'

// import {
//   signInWithEmailAndPassword,
//   signInWithGoogle,
// } from "@/lib/firebase/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    
    if (email === "test@example.com" && password === "password") {
      router.push("/dashboard");
    } else {
      setErrorMessage("Invalid email or password. Please try again.");
    }

// try {
    //   const result = await signInWithEmailAndPassword({ email, password });
    //   if ('user' in result) {
    //     router.push("/");
    //   } else {
    //     setErrorMessage(result.error || "Login failed. Please try again.");
    //   }
    // } catch (error) {
    //   if (error instanceof Error) {
    //     console.error("Error logging in with email and password", error);
    //     if (error.message.includes("user-not-found")) {
    //       setErrorMessage("No account found with this email. Please sign up.");
    //     } else if (error.message.includes("wrong-password")) {
    //       setErrorMessage("Incorrect password. Please try again.");
    //     } else if (error.message.includes("invalid-email")) {
    //       setErrorMessage("Invalid email format. Please check your email.");
    //     } else {
    //       setErrorMessage("Login failed. Please try again.");
    //     }
    //   } else {
    //     console.error("Unknown error", error);
    //     setErrorMessage("An unknown error occurred. Please try again later.");
    //   }
    // }

  };

  

  const handleGoogleLogin = async () => {
    setErrorMessage("");
    router.push("/dasgboard");

 // try {
    //   const result = await signInWithGoogle();
    //   if (result === true) {
    //     router.push("/");
    //   } else {
    //     setErrorMessage(result?.error || "Google login failed. Please try again.");
    //   }
    // } catch (error) {
    //   console.error("Error during Google login", error);
    //   setErrorMessage("An error occurred during Google login. Please try again.");
    // }

  };

 
   

  return (
    <div className="min-h-screen flex flex-col">
      <header className="container px-4 mx-auto">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="hover:cursor-pointer">
            <Image
              src={Logo}
              alt="Logo"
              className="h-8 w-auto cursor-pointer"
            />
          </Link>
          <ModeToggle />
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-4xl">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-4 hidden md:block">
              <Image
                src={PlaceholderImage}
                alt="Placeholder Image"
                className="w-full h-auto rounded"
              />
            </div>
            <div className="w-full md:w-1/2 p-4">
              <CardHeader>
                <CardTitle className="text-2xl">Welcome Back!</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                {errorMessage && (
                  <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
                )}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="#"
                        className="text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      handleGoogleLogin();
                    }}
                  >
                    <Image
                      height={24}
                      width={24}
                      src={GoogleLogo}
                      alt="Google Logo"
                      className="mr-2 h-5 w-auto"
                    />
                    Login with Google
                  </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="underline">
                    Sign up
                  </Link>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Login;