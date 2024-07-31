import React from "react";
import TotalResponse from "./total-response";
import JobListing from "./job-listing";

type Props = {};

const ResponseList = (props: Props) => {
  return (
    <div className="flex gap-2 sm:flex-4 flex-col sm:flex-row">
      <TotalResponse />
      <JobListing />
    </div>
  );
};

export default ResponseList;
