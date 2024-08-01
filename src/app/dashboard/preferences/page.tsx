"use client"

import { useForm } from "react-hook-form"
import Link from "next/link"
import { CircleUser, Menu, Package2, Search, Sun, Moon } from "lucide-react"
import { CheckedState } from "@radix-ui/react-checkbox";
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AuthorizationContext } from "@/lib/userContext"
import { toast } from "@/components/ui/use-toast"


// Import your Firebase functions here
import { uploadLogo, saveCompanyData } from "@/lib/firebase/adminUserData"

export default function Dashboard() {
  const { setTheme, theme } = useTheme()
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDarkMode = localStorage.getItem("theme") === "dark"
    setDarkMode(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(true)
    setTheme("dark")
    localStorage.setItem("theme", "dark")
    document.documentElement.classList.add("dark")
  }

  const toggleLightMode = () => {
    setDarkMode(false)
    setTheme("light")
    localStorage.setItem("theme", "light")
    document.documentElement.classList.remove("dark")
  }

  const toggleSystemMode = () => {
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(isSystemDark)
    setTheme("system")
    localStorage.setItem("theme", "system")
    if (isSystemDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const pathname = usePathname()
  
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
          <Link 
              href="./settings" 
              className={`font-semibold ${pathname === '/settings' ? 'text-primary' : ''}`}
            >
              General
            </Link>
            <Link 
              href="./preferences"
              className={`font-semibold ${pathname === '/preferences' ? 'text-primary' : ''}`}
            >
              Preferences
            </Link>
          </nav>
          <div className="grid gap-6">
            <form>
              <Card>
                <CardHeader>
                  <CardTitle>Display Mode</CardTitle>
                  <CardDescription>
                    Select the display mode for your dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <Card 
                    className={`cursor-pointer transition-all  }`}
                    onClick={toggleLightMode}
                  >
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <Sun className="h-12 w-12 text-yellow-500 mb-4" />
                      <h3 className="text-lg font-semibold">Light Mode</h3>
                      <p className="text-sm text-muted-foreground text-center mt-2">
                        Bright and clear interface for daytime use
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className={`cursor-pointer transition-all  }`}
                    onClick={toggleDarkMode}
                  >
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <Moon className="h-12 w-12 text-indigo-400 mb-4" />
                      <h3 className="text-lg font-semibold">Dark Mode</h3>
                      <p className="text-sm text-muted-foreground text-center mt-2">
                        Easy on the eyes for nighttime viewing
                      </p>
                    </CardContent>
                  </Card>
                </CardContent>
    
              </Card>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}