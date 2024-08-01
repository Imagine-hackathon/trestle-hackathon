"use client";

import DemoPage from "@/app/payment/page";
import { toast } from "@/components/ui/use-toast";
import {
    AiResponse,
    ApplicationType,
    getAiResponse,
    getApplications,
} from "@/lib/firebase/jobs";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { jobId: string } }) => {
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
                    .catch((e) =>
                        toast({ title: "Error", description: e.message })
                    );
            })
            .catch((e) => toast({ title: "Error", description: e.message }));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const combinedData = applications
        .map((item1) => {
            const matchingItem = aiResponse.find(
                (item2) => item2.data.jobId === item1.data.jobId
            );
            if (matchingItem && matchingItem.data.aiAnalysis) {
                const { merits, demerits, ratings } =
                    matchingItem.data.aiAnalysis;
                return {
                    name: item1.data.name,
                    skillMatch: ratings.skillsMatch,
                    overallMatch: ratings.overallFit,
                    experienceMatch: ratings.experienceMatch,
                    merits: merits,
                    demerits: demerits,
                    pdfLink: item1.data.resumeLink,
                };
            }
            return null;
        })
        .filter((item) => item !== null);

    return (
        <div>
            {JSON.stringify(applications)}
            <div>{JSON.stringify(aiResponse)}</div>
            <DemoPage combinedData={combinedData} />
        </div>
    );
};

export default Page;

export type combinedArray = {
    id: string;
    jobId: string;
    contact: string;
    email: string;
    resumeLink: string;
    name: string;
    aiAnalysis: {
        demerits: string[];
        merits: string[];
        ratings: {
            educationMatch: number;
            experienceMatch: number;
            overallFit: number;
            skillsMatch: number;
        };
    } | null;
}[];
