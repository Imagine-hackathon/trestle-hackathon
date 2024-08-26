"use client";
import React, { useContext, useEffect, useState } from "react";
import { JobListing } from "@/components/JobListings";
import Link from "next/link";
import Image from "next/image";
import Logo from "/public/assets/logo.png";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { Check, Search, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchAndReturn } from "@/lib/firebase/fetchData";
import { getAllJobs } from "@/lib/firebase/jobs";

interface JobListingProps {
  company: string;
  role: string;
  location: string;
  officelocation: string;
  type: string;
  salary: number;
  experience: string;

  description: string[];
  applicants: number;
  timeCreated: any;
  imageurl?: string;
}

interface FilterListProps {
  title: string;
  items: string[];
  search?: boolean;
  placeholder?: string;
  filterName: string;
  filters: any;
  handleFilterChange: (filterName: string, value: string | string[]) => void;
}

const FilterList = (props: FilterListProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-lg">{props.title}</h3>
      {!props?.search ? (
        <div className="space-y-1">
          {props?.items.map((item, key) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={`${props.filterName}-${key}`}
                checked={props.filters[props.filterName].includes(item)}
                onCheckedChange={(checked) => {
                  const newValue = checked
                    ? [...props.filters[props.filterName], item]
                    : props.filters[props.filterName].filter(
                        (i: string) => i !== item
                      );
                  props.handleFilterChange(props.filterName, newValue);
                }}
              />
              <label
                htmlFor={`${props.filterName}-${key}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item}
              </label>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder={props?.placeholder}
              value={props.filters[props.filterName] as string}
              onChange={(e) =>
                props.handleFilterChange(props.filterName, e.target.value)
              }
              className="flex-1"
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => props.handleFilterChange(props.filterName, "")}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {Array.isArray(props.filters[props.filterName]) && (
            <div className="flex flex-wrap gap-2">
              {(props.filters[props.filterName] as string[]).map(
                (item, key) => (
                  <Badge key={key} variant="secondary" className="text-xs">
                    {item}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => {
                        const newValue = props.filters[props.filterName].filter(
                          (i: string) => i !== item
                        );
                        props.handleFilterChange(props.filterName, newValue);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Jobs = () => {
  const [filters, setFilters] = useState({
    jobType: [] as string[],
    experienceLevel: [] as string[],
    preferredLocation: [] as string[],
    location: "",
    company: "",
  });

  const handleFilterChange = (filterName: string, value: string | string[]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const mapJobExperience = (exp: string) => {
    let years = [""];
    let currentidx = 0;
    for (let e = 0; e < exp.length; e++) {
      if (isNaN(parseInt(exp[e]))) {
        years.push("");
        currentidx += 1;
      } else {
        years[currentidx] += exp[e];
      }
    }
    console.log(years);
    let num_years = years?.map((y) => parseInt(y));
    if (num_years?.[0] < 2) {
      return "Beginner";
    } else if (num_years?.[0] < 5) {
      return "Intermediate";
    }

    return "Expert";
  };

  const filtersList: FilterListProps[] = [
    {
      title: "Job type",
      items: ["Full-time", "Part-time"],
      filterName: "jobType",
      filters: filters,
      handleFilterChange: handleFilterChange,
    },
    {
      title: "Experience Level",
      items: ["Expert", "Intermediate", "Beginner"],
      filterName: "experienceLevel",
      filters: filters,
      handleFilterChange: handleFilterChange,
    },
    {
      title: "Preferred Location",
      items: ["Remote", "Onsite", "Both"],
      filterName: "preferredLocation",
      filters: filters,
      handleFilterChange: handleFilterChange,
    },
    {
      title: "Location",
      search: true,
      items: [],
      placeholder: "Anywhere",
      filterName: "location",
      filters: filters,
      handleFilterChange: handleFilterChange,
    },
    {
      title: "Company",
      search: true,
      items: [],
      placeholder: "Type Company Name here...",
      filterName: "company",
      filters: filters,
      handleFilterChange: handleFilterChange,
    },
  ];

  const [sortBy, setSortBy] = useState<"salary" | "Date Posted" | null>(null);
  const [jobList, setJobList] =
    useState<{ jobDetails: JobListingProps; id: string }[]>();
  const [filteredJobs, setFilteredJobs] =
    useState<{ jobDetails: JobListingProps; id: string }[]>();

  useEffect(() => {
    if (jobList) {
      setFilteredJobs(
        jobList
          ?.filter(({ jobDetails, id }) => {
            console.log(
              filters,
              mapJobExperience(jobDetails.experience),
              filters.experienceLevel
                .map((i) => i.toLowerCase())
                .includes(mapJobExperience(jobDetails.experience).toLowerCase())
            );

            return (
              (filters.jobType.length === 0 ||
                filters.jobType
                  ?.map((i) =>
                    i.replace(" ", "").replace("-", "").toLowerCase()
                  )
                  .includes(
                    jobDetails.type
                      .toLowerCase()
                      .replace(" ", "")
                      .replace("-", "")
                  )) &&
              (filters.experienceLevel.length === 0 ||
                filters.experienceLevel
                  .map((i) => i.toLowerCase())
                  .includes(
                    mapJobExperience(jobDetails.experience).toLowerCase()
                  )) &&
              (filters.preferredLocation.length === 0 ||
                filters.preferredLocation.includes("Both") ||
                filters.preferredLocation
                  .map((e) => e.toLowerCase())
                  .includes(jobDetails.location.toLowerCase())) &&
              (filters.location === "" ||
                jobDetails.officelocation
                  .toLowerCase()
                  .includes(filters.location.toLowerCase())) &&
              (filters.company === "" ||
                jobDetails.company
                  .toLowerCase()
                  .includes(filters.company.toLowerCase()))
            );
          })
          .sort((a, b) => {
            if (sortBy === null) {
              return 0;
            } else {
              if (sortBy === "salary") {
                return b.jobDetails.salary - a.jobDetails.salary;
              } else {
                return (
                  b.jobDetails.timeCreated.seconds -
                  a.jobDetails.timeCreated.seconds
                );
              }
            }
          })
      );
      return;
    }
    getAllJobs()
      .then((data) => {
        setJobList(data);
        console.log(data);

        setFilteredJobs(
          data
            ?.filter((data) => {
              const job = data.jobDetails;

              return (
                (filters.jobType.length === 0 ||
                  filters.jobType.includes(job.type)) &&
                (filters.experienceLevel.length === 0 ||
                  filters.experienceLevel.includes(
                    mapJobExperience(job.experience)
                  )) &&
                (filters.preferredLocation.length === 0 ||
                  job.location.toLowerCase() === "both" ||
                  filters.preferredLocation.includes(
                    job.location.toLowerCase()
                  )) &&
                (filters.location === "" ||
                  job.officelocation
                    .toLowerCase()
                    .includes(filters.location.toLowerCase())) &&
                (filters.company === "" ||
                  job.company
                    .toLowerCase()
                    .includes(filters.company.toLowerCase()))
              );
            })
            .sort((a, b) => {
              if (sortBy === null) {
                return 0;
              } else {
                if (sortBy === "salary") {
                  return b.jobDetails.salary - a.jobDetails.salary;
                } else {
                  return (
                    a.jobDetails.timeCreated.seconds -
                    b.jobDetails.timeCreated.seconds
                  );
                }
              }
            })
        );
      })
      .catch((e: any) => console.log(e));
  }, [filters, jobList, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image src={Logo} alt="Logo" className="h-8 w-auto" />
            </Link>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {filtersList.map((filterProps, index) => (
                  <FilterList key={index} {...filterProps} />
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="md:w-3/4 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>All Jobs</CardTitle>
                <div className="flex items-center space-x-4">
                  <p className="text-sm text-gray-500">Sort by:</p>
                  <Select
                    onValueChange={(value) =>
                      setSortBy(value as "salary" | "Date Posted" | null)
                    }
                    value={sortBy || undefined}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="Date Posted">Date Posted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {filteredJobs !== undefined ? (
                  <p className="text-sm text-gray-500 mb-4">
                    Showing {filteredJobs?.length || 0} of{" "}
                    {jobList?.length || 0} jobs
                  </p>
                ) : (
                  <p>
                    <svg
                      className="mr-3 h-5 w-5 animate-spin dark:text-white text-gray-900"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </p>
                )}
                <div className="space-y-4">
                  {filteredJobs?.map((job, key) => {
                    console.log(job);
                    return (
                      <JobListing
                        key={key}
                        id={job.id}
                        jobDetails={job.jobDetails}
                      />
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Jobs;
