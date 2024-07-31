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
type Props = {};

const JobListing = (props: Props) => {
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
          <JobListTableRow />
          <JobListTableRow />
          <JobListTableRow />

          {/* <TableRow>
            <TableCell>
              <div className="font-medium">Full Stack Dev</div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">Full Time</TableCell>
            <TableCell className="hidden sm:table-cell">08</TableCell>
            <TableCell className="hidden md:table-cell">100</TableCell>
            <TableCell className="text-right">
              {" "}
              <Badge
                className="text-xs bg-red-600/90 text-white"
                variant="default"
              >
                Inactive{" "}
              </Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="font-medium">DevOps</div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">Internship</TableCell>
            <TableCell className="hidden sm:table-cell">12</TableCell>
            <TableCell className="hidden md:table-cell">05</TableCell>
            <TableCell className="text-right">
              <Badge
                className="text-xs bg-green-600/90 text-white"
                variant="default"
              >
                Active{" "}
              </Badge>
            </TableCell>
          </TableRow> */}
          {/* <TableRow>
            <TableCell>
              <div className="font-medium">Emma Brown</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                emma@example.com
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">Sale</TableCell>
            <TableCell className="hidden sm:table-cell">
              <Badge className="text-xs" variant="secondary">
                Fulfilled
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">2023-06-26</TableCell>
            <TableCell className="text-right">$450.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="font-medium">Liam Johnson</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                liam@example.com
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">Sale</TableCell>
            <TableCell className="hidden sm:table-cell">
              <Badge className="text-xs" variant="secondary">
                Fulfilled
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="font-medium">Liam Johnson</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                liam@example.com
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">Sale</TableCell>
            <TableCell className="hidden sm:table-cell">
              <Badge className="text-xs" variant="secondary">
                Fulfilled
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="font-medium">Olivia Smith</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                olivia@example.com
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">Refund</TableCell>
            <TableCell className="hidden sm:table-cell">
              <Badge className="text-xs" variant="outline">
                Declined
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">2023-06-24</TableCell>
            <TableCell className="text-right">$150.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="font-medium">Emma Brown</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                emma@example.com
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">Sale</TableCell>
            <TableCell className="hidden sm:table-cell">
              <Badge className="text-xs" variant="secondary">
                Fulfilled
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">2023-06-26</TableCell>
            <TableCell className="text-right">$450.00</TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobListing;
