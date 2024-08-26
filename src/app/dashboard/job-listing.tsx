import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Jobs } from "./page";

type Props = {
  table: { data: Jobs; id: string }[];
};

const JobListing = ({ table }: Props) => {
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-800">
            <TableHead className="font-semibold">Job Title</TableHead>
            <TableHead className="hidden sm:table-cell font-semibold">Category</TableHead>
            <TableHead className="hidden sm:table-cell font-semibold">Openings</TableHead>
            <TableHead className="hidden md:table-cell font-semibold">Applications</TableHead>
            <TableHead className="text-right font-semibold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.map((job, index) => {
            const { data: row } = job;
            return (
              <TableRow key={job.id} className={index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}>
                <TableCell>
                  <div className="font-medium text-gray-900 dark:text-gray-100">{row.role}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-gray-600 dark:text-gray-300">
                  {row.location}
                </TableCell>
                <TableCell className="hidden sm:table-cell text-gray-600 dark:text-gray-300">
                  {row.applicants}
                </TableCell>
                <TableCell className="hidden md:table-cell text-gray-600 dark:text-gray-300">135</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`text-xs ${
                      row.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    } px-2 py-1 rounded-full font-medium`}
                  >
                    {row.status}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobListing;