"use client";

import DemoPage from "@/app/payment/demopage";
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

    // Map applicationId to application data for quick lookup
    const appDataMap = applications.reduce((acc, app) => {
        //@ts-ignore
        acc[app.id] = app.data;
        return acc;
    }, {});

    // Create the new array with the required structure
    const combinedData = aiResponse
        .map((ai) => {
            //@ts-ignore
            const appData = appDataMap[ai.data.applicationId];
            if (appData) {
                return {
                    name: appData.name,
                    skillMatch: ai.data.aiAnalysis.ratings.skillsMatch,
                    overallMatch: ai.data.aiAnalysis.ratings.overallFit,
                    experienceMatch: ai.data.aiAnalysis.ratings.experienceMatch,
                    merits: ai.data.aiAnalysis.merits,
                    demerits: ai.data.aiAnalysis.demerits,
                    pdfLink: appData.resumeLink,
                };
            }
            return null; // or handle missing data differently
        })
        .filter((item) => item !== null); // Filter out null entries if any
    return (
        <div>
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
