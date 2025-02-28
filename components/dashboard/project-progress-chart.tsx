"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { useTheme } from "next-themes";

const data = [
  { name: "Website Redesign", completed: 68, remaining: 32 },
  { name: "Mobile App", completed: 45, remaining: 55 },
  { name: "CRM Integration", completed: 90, remaining: 10 },
  { name: "Marketing Campaign", completed: 35, remaining: 65 },
  { name: "Database Migration", completed: 72, remaining: 28 },
];

export function ProjectProgressChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Project Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              horizontal={true}
              vertical={false}
              stroke={isDark ? "#333" : "#eee"}
            />
            <XAxis 
              type="number" 
              domain={[0, 100]} 
              tick={{ fill: isDark ? "#ccc" : "#333" }}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              tick={{ fill: isDark ? "#ccc" : "#333" }}
              width={90}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? "#1f1f1f" : "#fff",
                borderColor: isDark ? "#333" : "#eee",
                color: isDark ? "#fff" : "#000"
              }}
            />
            <Legend />
            <Bar 
              dataKey="completed" 
              stackId="a" 
              fill="hsl(var(--chart-1))" 
              name="Completed (%)" 
            />
            <Bar 
              dataKey="remaining" 
              stackId="a" 
              fill="hsl(var(--chart-2))" 
              name="Remaining (%)" 
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}