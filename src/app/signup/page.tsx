"use client";

import React, { useContext, useEffect, useState } from "react";
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

import { createUserWithEmailAndPassword, signInWithGoogle, updateProfile } from "@/lib/firebase/auth";
import { AuthorizationContext } from "@/lib/userContext";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>(""); // Add this line
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [error, setError] = useState<string>(""); // Add this line
  const router = useRouter();
  
  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(""); // Clear any previous errors

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential: any = await createUserWithEmailAndPassword({email, password});
      const user = userCredential?.user;
      if (!user){
        setError('An error occurred: ' + userCredential?.error);
        return;
      }
      await updateProfile(user,`${firstName} ${lastName}`);
      
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error signing up with email and password", error);
        setError(error.message);
      } else {
        console.error("Unknown error", error);
        setError("An unknown error occurred");
      }
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const valid = await signInWithGoogle();
      if (valid){
        
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error signing in with Google", error);
        setError(error.message);
      } else {
        console.error("Unknown error", error);
        setError("An unknown error occurred");
      }
    }
  };

  const userCred = useContext(AuthorizationContext);
  const user = userCred?.user; // works even if context is not defined
  const userLoading = userCred?.loading;

  // Effects
  useEffect(() => {
    if (userLoading) {
      // don't do anything if user is not confirmed
      return;
    }
    if (user === undefined) {
      // user is still not confirmed. Keep the loading page.
      return;
    }
    if (user === null && !userLoading) {
      // We have finished verifying but the user does not exist / no signin info
      // Finish waiting
      
      return;
    }
    // Navigate automatically to the dashboard. We don't want to display the signin to someone already signed in if by mistake.
    router.push(`/dashboard`)
  }, [user, userLoading, router]);


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
               
                <form onSubmit={handleSignUp} className="space-y-4">
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
                      handleGoogleSignUp();
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

export default SignUp;
