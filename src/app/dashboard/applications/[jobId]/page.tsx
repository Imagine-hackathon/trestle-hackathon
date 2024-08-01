"use client";

import { toast } from "@/components/ui/use-toast";
import {
  AiResponse,
  ApplicationType,
  getAiResponse,
  getApplications,
} from "@/lib/firebase/jobs";
import { useEffect, useState } from "react";

const page = ({ params }: { params: { jobId: string } }) => {
  const [applications, setApplicatinos] = useState<
    { id: string; data: ApplicationType }[]
  >([]);
  const [aiResponse, setAiResponse] = useState<
    { id: string; data: AiResponse }[]
  >([]);
  useEffect(() => {
    getApplications(params.jobId)
      .then((res) => {
        setApplicatinos(res);
        getAiResponse(params.jobId)
          .then((res) => {
            setAiResponse(res);
          })
          .catch((e) => toast({ title: "Error", description: e.message }));
      })
      .catch((e) => toast({ title: "Error", description: e.message }));
  }, []);
  return (
    <div>
      {JSON.stringify(applications)}
      <div>{JSON.stringify(aiResponse)}</div>
    </div>
  );
};

export default page;
