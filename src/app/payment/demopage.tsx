"use client";
import { DataTableTypes, columns } from "./columns";
import { DataTable } from "./data-table";
//import { combinedArray } from "../dashboard/applications/[jobId]/page";
//@ts-ignore
export interface DemoPageProps {
  combinedData: DataTableTypes[];
}

const DemoPage = ({ combinedData }:any) => {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={combinedData||[]} />
    </div>
  );
};

export default DemoPage;
