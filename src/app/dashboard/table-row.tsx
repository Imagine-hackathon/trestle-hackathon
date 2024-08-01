import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";

type Props = {};

const JobListTableRow = (props: Props) => {
  return (
    <TableRow className="bg-accent">
      <TableCell>
        <div className="font-medium">UI UX Designer</div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">Full Time</TableCell>
      <TableCell className="hidden sm:table-cell">12</TableCell>
      <TableCell className="hidden md:table-cell">135</TableCell>
      <TableCell className="text-right">
        {" "}
        <Badge className="text-xs bg-green-600/90 text-white" variant="default">
          Active{" "}
        </Badge>
      </TableCell>
    </TableRow>
  );
};

export default JobListTableRow;
