"use client";
import Lottie from "lottie-react";
import React, { useContext, useEffect } from "react";
import jobAnimation from "@/animations/jobanimation.json";
import { AuthorizationContext } from "@/lib/userContext";
import { Card } from "@/components/ui/card";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

type Props = {};

const Hero = (props: Props) => {
  const { user } = useContext(AuthorizationContext);

  const [jobCount, setJobCount] = React.useState(0);

  useEffect(() => {
    // Reference to the collection
    const getCount = async () => {
      const collectionRef = collection(db, "jobs");

      try {
        const q = query(collectionRef, where("userId", "==", user.uid));

        // Get all documents in the collection
        const querySnapshot = await getDocs(q);

        // Count the number of documents
        const count = querySnapshot.size;

        setJobCount(count);
        return count;
      } catch (error) {
        console.error("Error counting documents: ", error);
      }
    };
    getCount();
  }, []);

  return (
    <Card className="p-6 sm:p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-800 transition-all duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex-1 space-y-4 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Welcome back,{" "}
            <span className="text-imagine-blue dark:text-blue-400">
              {user?.displayName || user?.displayEmail}
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Here is an overview of your dashboard
          </p>
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            {/* <div className="bg-blue-100 dark:bg-blue-900 p-3 px-6 rounded-lg">
              <span className="text-green-600 dark:text-blue-300 font-semibold">
                {jobCount} {jobCount === 1 ? "Job" : "Jobs"}
              </span>
            </div> */}
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg px-6">
              <span className="text-green-600 dark:text-green-300 font-semibold">
                {jobCount} {jobCount === 1 ? "Job" : "Jobs"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 w-full sm:w-1/3 max-w-xs">
          <Lottie animationData={jobAnimation} loop={true} className="w-full" />
        </div>
      </div>
    </Card>
  );
};

export default Hero;
