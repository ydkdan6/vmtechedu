"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalyticsChartsProps {
  enrollmentsByMonth: { month: string; count: number }[];
  enrollmentsByStatus: { status: string; count: number }[];
  schoolRequestsByInterest: { interest: string; count: number }[];
  tutorsBySpecialization: { specialization: string; count: number }[];
  courseDemand: { course: string; enrollments: number }[];
  institutionalInterest: { month: string; schools: number; tutors: number }[];
}

const COLORS = [
  "oklch(0.55 0.2 240)",
  "oklch(0.7 0.15 220)",
  "oklch(0.65 0.18 200)",
  "oklch(0.8 0.1 210)",
  "oklch(0.45 0.15 250)",
  "oklch(0.75 0.12 230)",
];

const STATUS_COLORS: Record<string, string> = {
  pending: "oklch(0.8 0.15 85)",
  approved: "oklch(0.6 0.15 145)",
  rejected: "oklch(0.6 0.2 25)",
  contacted: "oklch(0.55 0.2 240)",
  interviewing: "oklch(0.7 0.15 220)",
};

export function AnalyticsCharts({
  enrollmentsByMonth,
  enrollmentsByStatus,
  schoolRequestsByInterest,
  tutorsBySpecialization,
  courseDemand,
  institutionalInterest,
}: AnalyticsChartsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Course Demand - Top Courses by Enrollment */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Course Demand (Top Courses by Enrollment)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            {courseDemand.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseDemand} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.02 240)" />
                  <XAxis
                    type="number"
                    tick={{ fill: "oklch(0.45 0.03 240)", fontSize: 12 }}
                    axisLine={{ stroke: "oklch(0.88 0.02 240)" }}
                  />
                  <YAxis
                    dataKey="course"
                    type="category"
                    width={180}
                    tick={{ fill: "oklch(0.45 0.03 240)", fontSize: 11 }}
                    axisLine={{ stroke: "oklch(0.88 0.02 240)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.88 0.02 240)",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`${value} enrollments`, "Demand"]}
                  />
                  <Bar dataKey="enrollments" fill="oklch(0.55 0.2 240)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No course enrollment data yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Institutional Interest Over Time */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Institutional Interest Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            {institutionalInterest.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={institutionalInterest}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.02 240)" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "oklch(0.45 0.03 240)", fontSize: 12 }}
                    axisLine={{ stroke: "oklch(0.88 0.02 240)" }}
                  />
                  <YAxis
                    tick={{ fill: "oklch(0.45 0.03 240)", fontSize: 12 }}
                    axisLine={{ stroke: "oklch(0.88 0.02 240)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.88 0.02 240)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="schools"
                    name="School Requests"
                    stackId="1"
                    stroke="oklch(0.55 0.2 240)"
                    fill="oklch(0.55 0.2 240 / 0.3)"
                  />
                  <Area
                    type="monotone"
                    dataKey="tutors"
                    name="Tutor Applications"
                    stackId="2"
                    stroke="oklch(0.7 0.15 220)"
                    fill="oklch(0.7 0.15 220 / 0.3)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No institutional data yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Enrollments Over Time */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Enrollments Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            {enrollmentsByMonth.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={enrollmentsByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.02 240)" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "oklch(0.45 0.03 240)", fontSize: 12 }}
                    axisLine={{ stroke: "oklch(0.88 0.02 240)" }}
                  />
                  <YAxis
                    tick={{ fill: "oklch(0.45 0.03 240)", fontSize: 12 }}
                    axisLine={{ stroke: "oklch(0.88 0.02 240)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.88 0.02 240)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="oklch(0.55 0.2 240)"
                    strokeWidth={2}
                    dot={{ fill: "oklch(0.55 0.2 240)", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No enrollment data yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Enrollment Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Enrollment Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            {enrollmentsByStatus.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={enrollmentsByStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ status, percent }) =>
                      `${status} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="status"
                  >
                    {enrollmentsByStatus.map((entry) => (
                      <Cell
                        key={`cell-${entry.status}`}
                        fill={STATUS_COLORS[entry.status] || COLORS[0]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.88 0.02 240)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No enrollment data yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* School Requests by Area of Interest */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">School Requests by Interest</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            {schoolRequestsByInterest.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={schoolRequestsByInterest} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.02 240)" />
                  <XAxis
                    type="number"
                    tick={{ fill: "oklch(0.45 0.03 240)", fontSize: 12 }}
                    axisLine={{ stroke: "oklch(0.88 0.02 240)" }}
                  />
                  <YAxis
                    dataKey="interest"
                    type="category"
                    width={120}
                    tick={{ fill: "oklch(0.45 0.03 240)", fontSize: 11 }}
                    axisLine={{ stroke: "oklch(0.88 0.02 240)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.88 0.02 240)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="oklch(0.7 0.15 220)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No school request data yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tutors by Specialization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tutors by Specialization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            {tutorsBySpecialization.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tutorsBySpecialization}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.02 240)" />
                  <XAxis
                    dataKey="specialization"
                    tick={{ fill: "oklch(0.45 0.03 240)", fontSize: 10 }}
                    axisLine={{ stroke: "oklch(0.88 0.02 240)" }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis
                    tick={{ fill: "oklch(0.45 0.03 240)", fontSize: 12 }}
                    axisLine={{ stroke: "oklch(0.88 0.02 240)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.88 0.02 240)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="oklch(0.55 0.2 240)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No tutor application data yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
