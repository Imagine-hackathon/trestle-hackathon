import { Briefcase, BriefcaseBusiness, Circle, CircleAlert, Clock, Clock1, DollarSign, Dot, MessageCircleWarning } from "lucide-react";
import Image from "next/image";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { JobApply } from "./JobApply";


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
    <Card className="w-full flex p-4 flex-col">
      <div className="flex items-center gap-6">
        <Image
          alt="image listing"
          src={props.imageurl?props.imageurl:"/next.svg"}
          width={50}
          height={50}
          className="w-20 p-1 h-20 shadow-md rounded-lg border"
        ></Image>
        <div className="flex flex-1 justify-between items-start h-full">
          <div className="flex flex-col items-start">
            <h1 className="text-gray-500">{props.company}</h1>
            <p className="text-imagine-blue font-bold text-2xl">
              {props.role}
            </p>
            <p className="text-gray-600">{props.location} | {props.jobLocation} work available</p>
          </div>
          <div className="h-full flex justify-start items-start">
            <p className="text-slate-400">Posted {timeAgo(props.timePosted)} </p>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center py-5 gap-10">
        <div className="gap-2 flex text-gray-500 items-center">
          <Clock size={22} className=""></Clock>
          <p>{props.type==='fulltime'?"Full Time":"Freelance"}</p>
        </div>
        <div className="gap-2 flex text-gray-500 items-center">
          <DollarSign size={22} className=""></DollarSign>
          <p>{props.salary.toLocaleString('en-US')} a year</p>
        </div>
        <div className="gap-2 flex text-gray-500 items-center">
          <BriefcaseBusiness size={22} className=""/>
          <p>{props.experience} years experience</p>
        </div>
      </div>
      <div className="flex ">
        {/* Tag  */}
        {props.tags.map((tag, key)=>{
          return <p key={key} className={`flex text-white pl-1 pr-3 rounded-full py-[3px] font-light text-sm gap-1 items-center bg-${tag.color}-500`}><CircleAlert/><span>{tag.name}</span></p>
        })}
        
      </div>
      <ul className="flex flex-col py-6">
      {props.description.map((des, key)=>{
          // eslint-disable-next-line react/jsx-key
          return <li className="flex items-center -mt-2 text-gray-500"><Dot size={40}></Dot>{des}</li>
        
      })}
      </ul>
      <div className="flex flex-row items-center justify-between">
      <p className="text-slate-400">{props.applicants} applicants</p>
      <div className="flex items-center gap-6">
        <Button className="px-8 py-2" variant="outline" >Save</Button>
        <JobApply />
       
      </div>
      </div>
    </Card>
  );
};
