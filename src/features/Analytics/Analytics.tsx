import React from "react";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useDarkMode } from "../../context/DarkModeContext";

interface CustomBarProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
}
const CustomBar: React.FC<CustomBarProps> = ({
  x,
  y,
  width,
  height,
  fill,
}: CustomBarProps) => {
  return (
    <Rectangle
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      radius={[10, 10, 0, 0]}
    />
  );
};

interface AnalyticsProps {
  data: {
    day: string;
    completedTasks: number;
  }[];
}

function Analytics({ data }: AnalyticsProps) {
  const { isDarkMode } = useDarkMode();

  const colors = isDarkMode
    ? {
        completedTasks: { stroke: "#ff3333", fill: "#c94744" },
        text: "#2e3133",
        background: "#1d2022",
        cursor: "rgba(29, 32, 34, 0.5)",
      }
    : {
        completedTasks: { stroke: "#ff3333", fill: "#c94744" },
        text: "#374151",
        background: "#fff",
        cursor: "rgba(193, 194, 195, 0.1)",
      };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          tick={{ fill: colors.text }}
          tickLine={{ stroke: colors.text }}
        />

        <Tooltip
          contentStyle={{ backgroundColor: colors.background }}
          cursor={{ fill: colors.cursor, radius: 10 }}
        />

        <Bar
          dataKey="completedTasks"
          name="Completed Tasks"
          stroke={colors.completedTasks.stroke}
          fill={colors.completedTasks.fill}
          radius={[10, 10, 0, 0]}
          shape={<CustomBar />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Analytics;
