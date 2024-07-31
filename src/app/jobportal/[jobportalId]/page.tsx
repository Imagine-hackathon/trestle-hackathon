"use client";
import Image from "next/image";
import Link from "next/link";
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Header from "./header";
import Summary from "./summary";
import { useEffect, useState } from "react";
import { ListingResponse } from "@/app/dashboard/[adminId]/page";

export default function Dashboard() {
  const [table, setTable] = useState<ListingResponse[] | []>([]);
  const [adminData, setAdmin] = useState({});
  let summary = "";
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(
          "https://image-sharing-api-ten.vercel.app/myunsplash/create"
        );
        if (!res.ok) return;
        console.log(res);
        const data = await res.json();
        setTable(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();

    const getAmin = async () => {
      try {
        const res = await fetch("11");
        if (!res.ok) return;
        const data = await res.json();
        setAdmin(data);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Inactive</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Draft
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Inactive
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Job
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Jobs</CardTitle>
                  <CardDescription>
                    Manage your Jobs and view their performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client Name</TableHead>
                        <TableHead>Client Email</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Skill Match
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Experience Match
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Education Match
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Merits
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Demerits{" "}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {table.map((row) => {
                        return (
                          <TableRow>
                            <TableCell className="font-medium">
                              User name
                            </TableCell>
                            <TableCell>User email</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {row.response.ratings.overallFit}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {row.response.ratings.skillsMatch}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {row.response.ratings.experienceMatch}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {row.response.ratings.educationMatch}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {
                                <Summary
                                  summary={row.response.merits
                                    .map((msg) => {
                                      let temp = "";
                                      summary += "\n" + msg;
                                      temp = summary;
                                      summary = "";

                                      return temp;
                                    })
                                    .toString()}
                                >
                                  <Button variant="outline">Merits</Button>
                                </Summary>
                              }
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {
                                <Summary
                                  summary={row.response.demerits
                                    .map((msg) => {
                                      let temp = "";
                                      summary += "\n" + msg;
                                      temp = summary;
                                      summary = "";

                                      return temp;
                                    })
                                    .toString()}
                                >
                                  <Button variant="outline">Demerits</Button>
                                </Summary>
                              }
                            </TableCell>
                          </TableRow>
                        );
                      })}

                      <TableRow>
                        <TableCell className="font-medium">
                          Hypernova Headphones
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Active</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          88
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Summary summary="HEllo I am summary">
                            <Button variant="outline">Show Summary</Button>
                          </Summary>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-10-18 03:21 PM
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>{table.length}</strong> of{" "}
                    <strong>{table.length}</strong> jobs
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
