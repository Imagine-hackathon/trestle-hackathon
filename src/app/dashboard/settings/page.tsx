"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { CircleUser, Menu, Package2, Search } from "lucide-react"
import { CheckedState } from "@radix-ui/react-checkbox";

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
  const [file, setFile] = useState<File | null>(null)
  const [companyName, setCompanyName] = useState("")
  const [useAsDefault, setUseAsDefault] = useState(true)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      let logoUrl = ""
      if (file) {
        logoUrl = await uploadLogo(file)
      }

      const companyData = {
        name: companyName,
        logo: logoUrl,
        useAsDefault: useAsDefault
      }

      await saveCompanyData(companyData)

      toast({
        title: "Success",
        description: "Settings saved successfully!",
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: "An error occurred while saving settings.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link href="#" className="font-semibold text-primary">
              General
            </Link>
            <Link href="">Security</Link>
            <Link href="#">Integrations</Link>
            <Link href="#">Support</Link>
            <Link href="#">Organizations</Link>
            <Link href="#">Advanced</Link>
          </nav>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader>
                  <CardTitle>Company Name</CardTitle>
                  <CardDescription>
                    Used to identify your company.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                <Input 
                  placeholder="Company Name" 
                  type="text"
                  {...register("companyName", { 
                    required: "Company name is required",
                    onChange: (e) => setCompanyName(e.target.value)
                  })}
                />
                 
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Company Logo</CardTitle>
                  <CardDescription>
                    Logo for your Company
                  </CardDescription>
                </CardHeader>
                <CardContent>
                <Input
                    id="picture"
                    accept=".jpg, .jpeg, .png"
                    type="file"
                    {...register("logo", {
                      onChange: (e) => {
                        e.target.files?.length && setFile(e.target.files[0]);
                      }
                    })}
                  />

                  
                  <div className="flex items-center space-x-2 mt-4">
                  <Checkbox 
                    id="include" 
                    checked={useAsDefault}
                    onCheckedChange={(checked: CheckedState) => {
                      setUseAsDefault(checked === true);
                    }}
                    {...register("useAsDefault")}
                  />
                    <label
                      htmlFor="include"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Use as default
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button 
                    className="bg-imagine-blue" 
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}