import Image from "next/image";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { FileText, Target, Rocket, Zap, Cpu, Blocks } from "lucide-react";

const Landing = () => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <div className="min-h-[80vh] w-full flex flex-col items-center justify-center">
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
          <h1 className="sm:text-6xl text-4xl font-semibold mb-4 leading-tight text-imagine-secondary">
            Find freelance and full-time <br />
            <span className="text-imagine-blue">developer</span> jobs.
          </h1>
          <p className="sm:text-base text-base font-light max-w-[540px] mx-auto">
            ImagineRecruits is your one-stop center for thousands of digital
            freelance and full-time jobs.
          </p>
        </div>
        <div className="flex rounded-lg mt-12">
          <Input type="text" placeholder="Search a Job" />
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
        <Link href="/jobs">
        <Button className="mt-8 w-36 bg-imagine-blue" variant="default">
          All Jobs
        </Button>
        </Link>
      </div>

      <div className="w-full py-24 bg-green-200 bg-opacity-10 mt-8">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 text-imagine-blue leading-tight">
            The #1 Site for Jobs for both
            <span className="text-imagine-secondary"> Recruiters </span>
            and
            <span className="text-imagine-secondary"> Seekers</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Intelligent Resume Parsing",
                description:
                  "Automatically read and extract key information from CVs.",
                features: [
                  "Identify skills, experience, and qualifications",
                  "Focus on what matters",
                ],
                cta: "Try Now",
                icon: FileText,
              },
              {
                title: "Precision Matching",
                description:
                  "Match applicants to job requirements with advanced AI.",
                features: [
                  "Rank candidates by compatibility",
                  "See only the best-fit candidates",
                ],
                cta: "Learn More",
                icon: Target,
              },
              {
                title: "Streamlined Recruitment",
                description:
                  "Simplify your hiring process with ranked candidate lists.",
                features: [
                  "Quick and informed decisions",
                  "Reduce time-to-hire",
                ],
                cta: "Get Started!",
                icon: Rocket,
              },
            ].map((card, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
              >
                <div className="flex items-center mb-4">
                  <card.icon className="w-6 h-6 mr-2 text-imagine-secondary" />
                  <h3 className="text-l font-bold text-imagine-blue">
                    {card.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-6 flex-grow">
                  {card.description}
                </p>
                <ul className="text-gray-600 list-disc pl-5 mb-6 space-y-2">
                  {card.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <Link href="/signup">
                <Button className="w-full py-3 px-4 mt-auto bg-imagine-blue ">
                 {card.cta}
                </Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <h3 className="text-4xl font-bold mb-6 text-gray-800">
            <Link href="/signup"> Improve Your Job Search</Link> 
            </h3>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
              Experience a revolution in job searching and recruitment with our
              cutting-edge tools and intuitive platform. Join now and discover
              the future of job matching!
            </p>
            <Link href="/signup">
            <Button className="mt-8 py-4 px-8 bg-imagine-blue  hover:bg-imagine-blue transition-colors duration-300">
            Join Now
            </Button>

            </Link> 
          </div>
        </div>
      </div>

      <div className="w-full bg-white py-24">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-4xl font-extrabold text-center mb-16 text-imagine-blue">
      AI-Powered Pricing Plans
    </h2>
    <div className="grid md:grid-cols-3 gap-10">
      {[
        {
          title: "Imagine AI Explorer",
          price: "$0",
          features: [
            "Basic AI job matching",
            "Limited resume analysis",
            "5 AI-powered job applications/month"
          ],
          cta: "Get Started",
          icon: Zap
        },
        {
          title: "Imagine AI Pro",
          price: "$29",
          features: [
            "Advanced AI job matching",
            "Full resume analysis and optimization",
            "Unlimited AI-powered job applications",
            "AI-driven career insights",
            "Interview preparation with AI"
          ],
          cta: "Subscribe Now",
          icon: Cpu,
          highlighted: true
        },
        {
          title: "Imagine AI Business",
          price: "Custom",
          features: [
            "All AI Pro features",
            "Custom AI model training",
            "AI-powered talent pipeline",
            "Predictive hiring analytics",
            "Integration with existing HR systems"
          ],
          cta: "Contact Sales",
          icon: Blocks
        }
      ].map((plan, index) => (
        <div key={index} className={`
          p-8 bg-white rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-1
          ${plan.highlighted ? 'border-2 border-imagine-secondary shadow-xl hover:shadow-2xl' : 'hover:shadow-xl'}
          flex flex-col
        `}>
          <div className="flex items-center mb-6">
            <plan.icon className={`w-8 h-8 mr-3 ${plan.highlighted ? 'text-imagine-secondary' : 'text-gray-600'}`} />
            <h3 className="text-2xl font-bold text-gray-800">{plan.title}</h3>
          </div>
          <p className="text-4xl font-extrabold mb-6 text-imagine-blue">
            {plan.price}<span className="text-xl font-normal text-gray-600">/month</span>
          </p>
          <ul className="mb-8 flex-grow space-y-4">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <svg className="w-5 h-5 text-imagine-secondary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
          <button className={`
            w-full py-4 px-6 rounded-lg font-bold text-lg transition-colors duration-300
            ${plan.highlighted ? 'bg-imagine-blue text-white hover:bg-blue-800' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
          `}>
            {plan.cta}
          </button>
        </div>
      ))}
    </div>
    <p className="text-center mt-12 text-gray-600 text-lg">
      All plans include a 14-day AI-assisted trial. Upgrade, downgrade, or cancel anytime.
    </p>
  </div>
</div>
    </div>
  );
};

export default Landing;
