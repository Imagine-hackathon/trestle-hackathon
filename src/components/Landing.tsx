import Image from "next/image";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link";

const Landing = () => {
  return (
    <div className="relative h-[80vh] w-full flex flex-col items-center justify-center">
      <div className="relative w-96 h-96 mb-6">
        <Image
          src="/assets/girlPic.png"
          alt="girlPic"
          width={384}
          height={384}
          className="rounded-lg"
          priority
        />
      </div>
      <div className="text-center px-4">
        <h1 className="sm:text-6xl text-4xl font-semibold mb-4 leading-tight">
          Find freelance and full-time <br /> 
          <span className="text-imagine-blue">developer</span> jobs.
        </h1>
        <p className="sm:text-base text-sm font-light max-w-[540px] mx-auto">
          ImagineRecruits is your one-stop center for thousands of digital freelance and full-time jobs.
        </p>
      </div>
      <div className="flex rounded-lg mt-12 ">
        <Input
          type="text"
          placeholder="Search a Job"
        />
        <Select>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Job Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="freelance">Freelance</SelectItem>
              <SelectItem value="full-time">Fulltime</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
       

      </div>
      <Button className="mt-8 w-36 bg-imagine-blue" variant="default">
        <Link href="/jobs">All Jobs</Link>
      </Button>
    </div>
    
  );
};

export default Landing;
