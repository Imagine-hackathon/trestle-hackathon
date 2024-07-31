"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Search,
  ShoppingCart,
  Users2,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Textarea } from "@/components/ui/textarea";

import CustomSelect from "@/app/components/select";
import DatePickerWithRange from "@/app/components/datapicker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";

const items = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
] as const;

type formSchema = {
  company: string;
  role: string;
  location: string;
  joblocation: string;
  salary: string;
  experience: string;
  applicants: string;
  timeposted: number;
  imageurl?: string;
  description: string;
};
export default function CreateJob() {
  const FormSchema = z.object({
    company: z.string(),
    role: z.string(),
    location: z.string(),
    joblocation: z.string(),
    applicants: z.string(),
    timeposted: z.string(),
    experience: z.string(),
    description: z.string(),
    imageurl: z.string().optional(),
    type: z.string(),
    salary: z.string(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      company: "",
      role: "",
      location: "",
      joblocation: "",
      applicants: "",
      timeposted: "",
      experience: "",
      description: "",
      imageurl: "",
      type: "",
      salary: "",
    },
  });
  const onSubmit = (e: z.infer<typeof FormSchema>) => {
    console.log("Form submitted");
    console.log(e);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Edit Product</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/placeholder-user.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              {/* We will get the previous route from brie */}
              <Link href={"/"}>
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Create Job
              </h1>
            </div>
            <div className="w-full">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="">
                        <div className="flex  gap-4">
                          <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem className="sm:flex-[0.8] col-span-12 ">
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                  <Input
                                    className="sm:col-span-3 col-span-12 "
                                    placeholder="Full Stack developer needed"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                              <FormItem className="sm:flex-[0.8] col-span-12 ">
                                <FormLabel>Role</FormLabel>
                                <FormControl>
                                  <Input
                                    className="sm:col-span-3 col-span-12 "
                                    placeholder="Full Stack developer needed"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex  gap-4">
                          <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem className="sm:flex-[0.8] col-span-12 ">
                                <FormLabel>Locaion</FormLabel>
                                <FormControl>
                                  <Input
                                    className="sm:col-span-3 col-span-12 "
                                    placeholder="Full Stack developer needed"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="joblocation"
                            render={({ field }) => (
                              <FormItem className="sm:flex-[0.8] col-span-12 ">
                                <FormLabel>Job Location</FormLabel>
                                <FormControl>
                                  <Input
                                    className="sm:col-span-3 col-span-12 "
                                    placeholder="Full Stack developer needed"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex  gap-4">
                          <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                              <FormItem className="sm:flex-[0.8] col-span-12 ">
                                <FormLabel>Type</FormLabel>
                                <FormControl>
                                  <Input
                                    className="sm:col-span-3 col-span-12 "
                                    placeholder="Full Stack developer needed"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="applicants"
                            render={({ field }) => (
                              <FormItem className="sm:flex-[0.8] col-span-12 ">
                                <FormLabel>Applicants</FormLabel>
                                <FormControl>
                                  <Input
                                    className="sm:col-span-3 col-span-12 "
                                    placeholder="Full Stack developer needed"
                                    {...field}
                                    type="number"
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex  gap-4">
                          <FormField
                            control={form.control}
                            name="salary"
                            render={({ field }) => (
                              <FormItem className="sm:flex-[0.8] col-span-12 ">
                                <FormLabel>Salary</FormLabel>
                                <FormControl>
                                  <Input
                                    className="sm:col-span-3 col-span-12 "
                                    {...field}
                                    type="string"
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="experience"
                            render={({ field }) => (
                              <FormItem className="sm:flex-[0.8] col-span-12 ">
                                <FormLabel>Experience</FormLabel>
                                <FormControl>
                                  <Input
                                    className="sm:col-span-3 col-span-12 "
                                    placeholder="Full Stack developer needed"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="">
                          <FormField
                            control={form.control}
                            name="imageurl"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Upload file</FormLabel>
                                <FormControl>
                                  <Input
                                    id="picture"
                                    accept=".jpg, .jpeg, .png"
                                    type="file"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div>
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    id="description"
                                    defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                                    className="min-h-32"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button type="submit">Submit</Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
