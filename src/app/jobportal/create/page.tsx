"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, CircleUser, Loader2 } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Select } from "@radix-ui/react-select";
import { useContext, useState } from "react";
import { addImageTOBucket, addJob } from "@/lib/firebase/jobs";
import { toast } from "@/components/ui/use-toast";
import { AuthorizationContext } from "@/lib/userContext";

export type jobPostingSchema = {
  company: string;
  role: string;
  location: string;
  officelocation: string;
  salary: string;
  experience: string;
  applicants: string;
  imageurl?: string;
  description: string;
  type: string;
};

const CreateJob = () => {
  const FormSchema = z.object({
    company: z.string().min(1, { message: "Company name is required" }),
    role: z.string().min(1, { message: "Role is required" }),
    location: z.string().min(1, { message: "Location is required" }),
    officelocation: z
      .string()
      .min(1, { message: "Office location is required" }),
    applicants: z.string().min(1, { message: "Applicants are required" }),
    experience: z.string().min(1, { message: "Experience is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    type: z.string().min(1, { message: "Type is required" }),
    salary: z.string().min(1, { message: "Salary is required" }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    try {
      if (!file) {
        toast({
          variant: "destructive",
          description: "Please select an image file",
        });
        return;
      }
      const res = await addImageTOBucket(file);
      console.log(res);
      const ress = await addJob({ ...data, imageurl: res });
      console.log(ress);

      toast({
        description: "Job successfully submitted!",
      });
    } catch (error) {
      console.log("Error", error);
      toast({
        variant: "destructive",
        description: "An error occurred while submitting the job",
      });
    } finally {
      setLoading(false);
    }
  };

  const { user, load } = useContext(AuthorizationContext);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard/adminId">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Create Job</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                {user?.photoURL ? (
                  <Image
                    className="h-10 w-10"
                    height={50}
                    width={50}
                    alt="profile-image"
                    src={user?.photoURL}
                  ></Image>
                ) : (
                  <CircleUser className="h-5 w-5" />
                )}
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
              <Link href={"/dashboard/adminId"}>
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
                <Card>
                  <CardHeader>
                    <CardTitle>Add Job Post</CardTitle>
                    <CardDescription>
                      Fill in the details of the job post
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="gap-5 flex flex-col"
                      >
                        <div className="flex gap-4">
                          <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem className="sm:flex-[0.8] col-span-12">
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                  <Input
                                    className="sm:col-span-3 col-span-12"
                                    placeholder="Microsoft Inc"
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
                              <FormItem className="sm:flex-[0.8] col-span-12">
                                <FormLabel>Role</FormLabel>
                                <FormControl>
                                  <Input
                                    className="sm:col-span-3 col-span-12"
                                    placeholder="Frontend Developer"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex gap-4">
                          <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem className="sm:flex-[0.8] col-span-12">
                                <FormLabel>Location</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Work mode" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="remote">
                                      Remote
                                    </SelectItem>
                                    <SelectItem value="onsite">
                                      On-site
                                    </SelectItem>
                                    <SelectItem value="hybrid">
                                      Hybrid
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="officelocation"
                            render={({ field }) => (
                              <FormItem className="sm:flex-[0.8] col-span-12">
                                <FormLabel>Office Location</FormLabel>
                                <FormControl>
                                  <Input
                                    className="sm:col-span-3 col-span-12"
                                    placeholder="Accra, Ghana"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex gap-4">
                          <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                              <FormItem className="sm:flex-[0.8] col-span-12">
                                <FormLabel>Work Schedule</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Work schedule" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="full-time">
                                      Full-time
                                    </SelectItem>
                                    <SelectItem value="part-time">
                                      Part-time
                                    </SelectItem>
                                    <SelectItem value="contract">
                                      Contract
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="applicants"
                            render={({ field }) => (
                              <FormItem className="sm:flex-[0.8] col-span-12">
                                <FormLabel>Number of Applicants</FormLabel>
                                <FormControl>
                                  <Input
                                    className="sm:col-span-3 col-span-12"
                                    placeholder="10"
                                    {...field}
                                    type="number"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex gap-4">
                          <FormField
                            control={form.control}
                            name="salary"
                            render={({ field }) => (
                              <FormItem className="sm:flex-[0.8] col-span-12">
                                <FormLabel>Salary Expectation (USD)</FormLabel>
                                <FormControl>
                                  <Input
                                    className="sm:col-span-3 col-span-12"
                                    {...field}
                                    type="number"
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
                              <FormItem className="sm:flex-[0.8] col-span-12">
                                <FormLabel>
                                  Experience Required (in years)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="sm:col-span-3 col-span-12"
                                    placeholder="2 years"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div>
                          <Input
                            id="picture"
                            accept=".jpg, .jpeg, .png"
                            type="file"
                            onChange={(e) => {
                              e.target.files?.length &&
                                setFile(e.target.files?.[0]);
                            }}
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
                                    placeholder="Job description"
                                    className="min-h-32"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full mt-7"
                          onSubmit={form.handleSubmit(onSubmit)}
                          disabled={loading}
                        >
                          {loading ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            "Submit"
                          )}
                        </Button>
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
};

export default CreateJob;
