import React from "react";
import StatCard from "./stat-card";

type Props = {};

const StatList = (props: Props) => {
  return (
    <div className="">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 ">
        <StatCard />
        <StatCard />
        <StatCard />
        <StatCard />
      </div>
    </div>
  );
};

export default StatList;
