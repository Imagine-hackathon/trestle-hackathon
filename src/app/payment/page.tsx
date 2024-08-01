"use client";
import { useEffect, useState } from "react";
import { DataTableTypes, columns } from "./columns";
import { DataTable } from "./data-table";
import { combinedArray } from "../dashboard/applications/[jobId]/page";


export default function DemoPage({ combinedData }: { combinedData: DataTableTypes[] }) {



    return (
        <div className="container mx-auto py-10 ">
            <DataTable columns={columns} data={combinedData} />
        </div>
    );
}
