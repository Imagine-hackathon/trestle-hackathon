"use client";
import Link from "next/link";
import { PlusCircle, BarChart2, Users, Briefcase } from "lucide-react";

import { Button } from "@/components/ui/button";

import Hero from "./hero";
import ResponseList from "./response-list";
import Sidebar from "./sidebar";
import Header from "./header";
import { useEffect, useState } from "react";
import TotalResponse from "./total-response";
import JobListing from "./job-listing";
import { getApplicationsCount, getJobs } from "@/lib/firebase/jobs";


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
  const [applicationsCount, setApplicationsCount] = useState<number | null>(
    null
  );

  // const [adminData, setAdmin] = useState({});

  useEffect(() => {
    getJobs()
      .then((res) => {
        console.log(res);
        //@ts-ignore
        setTable(res);
      })
      .catch((error) => {
        console.log(error);
      });

    getApplicationsCount().then((res) => {
      setApplicationsCount(res || 0);
    });
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
              Dashboard
            </h1>
            <Link href="/jobportal/create">
              <Button className="flex items-center space-x-2 bg-imagine-blue hover:bg-blue-700 text-white">
                <PlusCircle className="h-5 w-5" />
                <span>Add Job</span>
              </Button>
            </Link>
          </div>

          <div className="mb-8">
            <Hero />
          </div>

          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={BarChart2}
              title="Total Applications"
              value={table.length }
            />
            <StatCard
              icon={Users}
              title="New Applicants"
              value={applicationsCount}
            />
            <StatCard
              icon={Briefcase}
              title="Open Positions"
              value={applicationsCount}
            />
            <StatCard icon={PlusCircle} title="Hired This Month" value="0" />
          </div>

          <div className="grid grid-cols-1">
            <div className="w-full">
              <JobListing table={table} />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

function StatCard({ icon: Icon, title, value }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
      <div className="flex items-center">
        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <span className="block text-2xl font-bold text-gray-800 dark:text-white">
            {value == null ? (
              <Skeleton className="w-[50px] h-[20px] rounded-lg" />
            ) : (
              value
            )}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
}
