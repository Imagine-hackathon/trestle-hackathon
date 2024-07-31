import * as React from "react"
import { useState, ChangeEvent, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useToast } from "@/components/ui/use-toast"

interface FormData {
  name: string;
  email: string;
  contact: string;
  cv: File | null;
}

export function JobApply() {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    contact: "",
    cv: null
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && (file.type === "application/pdf" || file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      setFormData(prevData => ({
        ...prevData,
        cv: file
      }))
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or DOC/DOCX file.",
        variant: "destructive",
      })
      e.target.value = ""
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the data to your server
    console.log("Form submitted:", formData)
    
    // Show success toast
    toast({
      title: "Application Submitted",
      description: "Your job application has been received successfully.",
    })
    
    
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      contact: "",
      cv: null
    })
    
    // Close the drawer
    setOpen(false)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="px-5 py-2 bg-imagine-blue">Apply Now</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Application Form</DrawerTitle>
            <DrawerDescription>Fill in the details</DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact">Contact</Label>
                <Input
                  id="contact"
                  type="text"
                  placeholder="0201234567"
                  required
                  value={formData.contact}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="cv">CV</Label>
                  <Input 
                    id="cv" 
                    type="file" 
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
            <DrawerFooter>
              <Button type="submit">Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}