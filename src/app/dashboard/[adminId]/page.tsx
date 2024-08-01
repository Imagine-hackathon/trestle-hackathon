"use client";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import Hero from "./hero";
import ResponseList from "./response-list";
import Sidebar from "./sidebar";
import Header from "./header";
import { useEffect, useState } from "react";
import TotalResponse from "./total-response";
import JobListing from "./job-listing";
import { getJobs } from "@/lib/firebase/jobs";

export interface ListingResponse {
  response: {
    ratings: {
      overallFit: number;
      skillsMatch: number;
      experienceMatch: number;
      educationMatch: number;
    };
    merits: string[];
    demerits: string[];
  };
}
export interface Jobs {
  role: string;
  applicants: string;
  status: string;
  location: string;
}
export default function Dashboard() {
  const [table, setTable] = useState<{ data: Jobs; id: string }[] | []>([]);
  const [adminData, setAdmin] = useState({});

  useEffect(() => {
    // const fetchJobs = async () => {
    //   try {
    //     const res = await fetch(
    //       "https://image-sharing-api-ten.vercel.app/myunsplash/create"
    //     );
    //     if (!res.ok) return;
    //     const data = await res.json();
    //     setTable(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchJobs();

    // const getAmin = async () => {
    //   try {
    //     const res = await fetch("11");
    //     if (!res.ok) return;
    //     const data = await res.json();
    //     setAdmin(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    getJobs()
      .then((res) => {
        console.log(res);
        setTable(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>

            <Link href={"/jobportal/create"}>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Job
                </span>
              </Button>
            </Link>
          </div>
          <Hero />
          <div className="flex gap-2 sm:flex-4 flex-col sm:flex-row">
            <TotalResponse />
            <JobListing table={table} />
          </div>
        </main>
      </div>
    </div>
  );
}
