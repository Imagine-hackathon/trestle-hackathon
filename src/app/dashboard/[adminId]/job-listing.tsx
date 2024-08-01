import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import JobListTableRow from "./table-row";
import { Jobs, ListingResponse } from "./page";
type Props = {
  table: { data: Jobs; id: string }[];
};

const JobListing = ({ table }: Props) => {
  return (
    <div className="border flex-[0.55]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead className="hidden sm:table-cell">Category</TableHead>
            <TableHead className="hidden sm:table-cell">Openings</TableHead>
            <TableHead className="hidden md:table-cell">Applications</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.map((job) => {
            const { data } = job;
            const row = data;
            return (
              <TableRow className="bg-accent">
                <TableCell>
                  <div className="font-medium">{row.role}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {row.location}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {row.applicants}
                </TableCell>
                <TableCell className="hidden md:table-cell">135</TableCell>
                <TableCell className="text-right">
                  {" "}
                  <Badge
                    className={`text-xs ${
                      status == "active" ? "bg-green-600/90" : "bg-red-600/90"
                    } text-white`}
                    variant="default"
                  >
                    {row.status}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
          <JobListTableRow />
          <JobListTableRow />
          <JobListTableRow />
        </TableBody>
      </Table>
    </div>
  );
};

export default JobListing;
