"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from "recharts";
import { useTheme } from "next-themes";

const data = [
  { name: "Ana Silva", value: 12, tasks: 12 },
  { name: "John Doe", value: 8, tasks: 8 },
  { name: "Maria Garcia", value: 15, tasks: 15 },
  { name: "David Kim", value: 10, tasks: 10 },
  { name: "Sarah Johnson", value: 7, tasks: 7 },
];

export function TeamWorkloadChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Workload</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name, props) => [`${value} tasks`, props.payload.name]}
              contentStyle={{ 
                backgroundColor: isDark ? "#1f1f1f" : "#fff",
                borderColor: isDark ? "#333" : "#eee",
                color: isDark ? "#fff" : "#000"
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}