import React from 'react';
import {
  Briefcase,
  Clock,
  DollarSign,
  Dot,
  MapPin,
  Users,
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JobApply } from "./JobApply";

export interface JobListingProps {
  company: string;
  role: string;
  location: string;
  jobLocation: string;
  type: string;
  salary: number;
  experience: string;
  description: string[];
  applicants: number;
  timePosted: number;
  imageurl?: string;
}

function timeAgo(date: number) {
  const seconds = Math.floor((new Date().getTime() - date) / 1000);

  const interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  if (interval === 1) {
    return interval + " year ago";
  }

  const months = Math.floor(seconds / 2628000);
  if (months > 1) {
    return months + " months ago";
  }
  if (months === 1) {
    return months + " month ago";
  }

  const days = Math.floor(seconds / 86400);
  if (days > 1) {
    return days + " days ago";
  }
  if (days === 1) {
    return days + " day ago";
  }

  const hours = Math.floor(seconds / 3600);
  if (hours > 1) {
    return hours + " hours ago";
  }
  if (hours === 1) {
    return hours + " hour ago";
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes > 1) {
    return minutes + ` mins ago`;
  }
  if (minutes === 1) {
    return minutes + " mins ago";
  }

  return "just now";
}

export const JobListing = (props: JobListingProps) => {
  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-4">
          <Image
            alt={`${props.company} logo`}
            src={props.imageurl || "/next.svg"}
            width={60}
            height={60}
            className="rounded-lg border p-1 shadow-sm"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-imagine-blue">{props.role}</h2>
            <p className="text-gray-600">{props.company}</p>
          </div>
          <Badge variant="secondary" className="text-xs">
            {timeAgo(props.timePosted)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span>{props.location} | {props.jobLocation}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span>{props.type === "fulltime" ? "Full Time" : "Freelance"}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign size={18} />
            <span>${props.salary.toLocaleString("en-US")}/year</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase size={18} />
            <span>{props.experience} years experience</span>
          </div>
        </div>
        <ul className="space-y-2 text-gray-700">
          {props.description.map((des, key) => (
            <li key={key} className="flex items-start">
              <Dot size={24} className="shrink-0" />
              <span>{des}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex items-center justify-between bg-gray-50 px-6 py-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Users size={18} />
          <span>{props.applicants} applicants</span>
        </div>
        <JobApply />
      </CardFooter>
    </Card>
  );
};

export default JobListing
