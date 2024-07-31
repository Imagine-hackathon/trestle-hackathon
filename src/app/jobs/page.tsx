"use client";
import { JobListing } from "@/components/JobListings";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Logo from '/public/assets/logo.png'
import { ModeToggle } from "@/components/ui/ModeToggle";
import { Circle, Search, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface JobListingProps {
  company: string
  role: string
  location: string
  jobLocation: string
  type: string
  salary: number
  experience: string,
  tags: {name: string, color: string}[],
  description: string[],
  applicants: number,
  timePosted: number
  imageurl?:string
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
    <div className="flex flex-col gap-2">
      <h2 className="font-medium">{props.title}</h2>

      {!props?.search ? (
        props?.items.map((i, key) => (
          <div key={key} className="flex items-center gap-2">
            <input 
              type="checkbox"
              checked={props.filters[props.filterName].includes(i)}
              onChange={(e) => {
                const newValue = e.target.checked
                  ? [...props.filters[props.filterName], i]
                  : props.filters[props.filterName].filter((item: string) => item !== i);
                props.handleFilterChange(props.filterName, newValue);
              }}
            />
            <label className="text-lg text-gray-500">{i}</label>
          </div>
        ))
      ) : (
        <div className="flex flex-col w-full">
          <div className="w-full flex items-center rounded-lg px-2">
            <Input
              type="text"
              className="px-2 flex-1 py-2"
              placeholder={props?.placeholder}
              value={props.filters[props.filterName] as string}
              onChange={(e) => props.handleFilterChange(props.filterName, e.target.value)}
            />
            <Button>
              <Search></Search>
            </Button>
          </div>
          {Array.isArray(props.filters[props.filterName]) && (
            <div className="flex flex-wrap mt-2 mb-2">
              {(props.filters[props.filterName] as string[]).map((i, k) => (
                <div key={k} className="flex flex-row items-center px-2 py-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg gap-1 text-white">
                  <p>{i}</p>
                  <X onClick={() => {
                    const newValue = props.filters[props.filterName].filter((item: string) => item !== i);
                    props.handleFilterChange(props.filterName, newValue);
                  }}/>
                </div>
              ))}
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
    location: '',
    company: '',
  });

  const handleFilterChange = (filterName: string, value: string | string[]) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const filtersList: FilterListProps[] = [
    {
      title: "Job type",
      items: ["Fulltime", "Freelance"],
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
      items: ["Remote", "Office", "Both"],
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
  const [jobList, setJobList] = useState<JobListingProps[]>([
    {
      company: "Google",
      role: "Product Lead",
      location: "Bangalore, India",
      jobLocation: "remote",
      type: "fulltime",
      salary: 120000,
      experience: "10+",
      tags: [{ name: "Urgent Recruiting", color: "red" }],
      description: [
        "Establish creative direction and develop concepts together with the product team.",
        "Present ideas and designs effectively.",
      ],
      applicants: 14,
      timePosted: new Date("2024-07-30T23:33:05+0000").getTime(),
    },
    {
      company: "MTN",
      imageurl: "/vercel.svg",
      role: "UX Designer for Product Based Company",
      location: "Bangalore, India",
      jobLocation: "office",
      type: "fulltime",
      salary: 120000,
      experience: "10+",
      tags: [{ name: "Urgent Recruiting", color: "red" }],
      description: [
        "Establish creative direction and develop concepts together with the product team.",
        "Present ideas and designs effectively.",
      ],
      applicants: 14,
      timePosted: new Date("2024-07-30T23:33:05+0000").getTime(),
    },
  ]);

  const filteredJobs = jobList.filter(job => {
    return (
      (filters.jobType.length === 0 || filters.jobType.includes(job.type)) &&
      (filters.experienceLevel.length === 0 || filters.experienceLevel.includes(job.experience)) &&
      (filters.preferredLocation.length === 0 || filters.preferredLocation.includes(job.jobLocation)) &&
      (filters.location === '' || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.company === '' || job.company.toLowerCase().includes(filters.company.toLowerCase()))
    );
  });
  
  return (
    <div>
      <header className="container px-4 mx-auto ">
        <div className="flex justify-between items-center py-4 my-4">
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

      <main className="flex flex-row w-full justify-center min-h-screen">
        <div className="w-full px-3 max-w-[1300px] flex flex-col">
          <div className="flex flex-col">
            <h1 className="py-5 text-2xl text-gray-600">All Jobs</h1>
            <p className="pb-8 text-gray-400">Page 1 of 120 Jobs</p>
          </div>
          <div className="flex flex-row w-full gap-5">
            <div className="flex flex-col gap-4">
              {filteredJobs.map((i, key) => (
                <JobListing
                  company={i.company}
                  role={i.role}
                  location={i.location}
                  jobLocation={i.jobLocation}
                  type={i.type}
                  salary={i.salary}
                  experience={i.experience}
                  tags={i.tags}
                  description={i.description}
                  applicants={i.applicants}
                  timePosted={i.timePosted}
                  imageurl={i?.imageurl}
                  key={key}
                ></JobListing>
              ))}
            </div>
            <div className="gap-12 flex flex-col flex-1">
              <Card className={"bg-white p-4 flex flex-col text-gray-400"}>
                <p className="font-semibold text-lg">Sort By</p>
                <div className="flex gap-12">
                  <div
                    onClick={() => setSortBy("salary")}
                    className="hover:cursor-pointer flex flex-row items-center gap-3"
                  >
                    {
                      <Circle
                        size={18}
                        className={sortBy === "salary" ? "text-imagine-blue" : ""}
                      ></Circle>
                    }
                    Salary
                  </div>
                  <div
                    onClick={() => setSortBy("Date Posted")}
                    className="hover:cursor-pointer flex flex-row items-center gap-3"
                  >
                    {
                      <Circle
                        size={18}
                        className={
                          sortBy === "Date Posted" ? "text-imagine-blue" : ""
                        }
                      ></Circle>
                    }
                    Date added
                  </div>
                </div>
              </Card>
              <Card className={"bg-white p-4 flex flex-col text-gray-400"}>
                <p className="font-semibold text-lg">Filters</p>
                <div className="flex flex-col gap-5 py-5">
                {filtersList.map((filterProps, index) => (
                  <FilterList
                    key={index}
                    {...filterProps}
                  />
                ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Jobs;