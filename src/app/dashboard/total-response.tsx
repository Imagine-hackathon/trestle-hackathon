"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  { month: 'Jan', postings: 45, applications: 200 },
  { month: 'Feb', postings: 52, applications: 189 },
  { month: 'Mar', postings: 48, applications: 220 },
  { month: 'Apr', postings: 61, applications: 305 },
  { month: 'May', postings: 55, applications: 290 },
  { month: 'Jun', postings: 67, applications: 350 },
];

export default function JobStats() {
  return (
    <div className="border w-full max-w-6xl p-2 sm:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Job Postings and Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="postings" fill="#8884d8" name="Job Postings" />
              <Bar yAxisId="right" dataKey="applications" fill="#82ca9d" name="Applications" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}