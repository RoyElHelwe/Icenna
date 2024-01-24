import { Card, CardHeader } from "@mui/material";
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell, Legend, Sector, ResponsiveContainer } from "recharts";

const data = [
  { name: "Booked", value: 60 },
  { name: "Rescheduled", value: 20 },
  { name: "Canceled", value: 10 },
  { name: "Checked out", value: 10 }
];
const COLORS = ['#bfbfbf', '#00C49F', 'red', 'black'];
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "end" : "middle";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      > {`${(percent * 100).toFixed(2)}%`}</text>

    </g>
  );
};

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <Card sx={{ m: 2, height: '100%', width: '100%' }} elevation={3}>
      {/* <CardHeader title={("Pie")} sx={{ textAlign: "center", mt: 5, }} /> */}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="60%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="top"
            // rounded
            iconType="circle"
            iconSize={8}
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
