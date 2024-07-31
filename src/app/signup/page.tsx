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

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please try again.");
      return;
    }

    // Simulated successful signup
    if (email === "newuser@example.com" && password === "password") {
      router.push("/");
    } else {
      setErrorMessage("An error occurred during signup. Please try again.");
    }
  };

  const handleGoogleSignup = async () => {
    setErrorMessage("");
    router.push("/");
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
                <CardTitle className="text-2xl">Create an Account</CardTitle>
                <CardDescription>
                  Enter your details below to sign up for an account
                </CardDescription>
              </CardHeader>
              <CardContent>
                {errorMessage && (
                  <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
                )}
                <form onSubmit={handleSignup} className="space-y-4">
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
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign Up
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      handleGoogleSignup();
                    }}
                  >
                    <Image
                      height={24}
                      width={24}
                      src={GoogleLogo}
                      alt="Google Logo"
                      className="mr-2 h-5 w-auto"
                    />
                    Sign Up with Google
                  </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="underline">
                    Login
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

export default Signup;
