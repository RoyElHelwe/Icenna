'use client'
import { Card } from "@mui/material";
import React, { useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const data = [
    {
        name: 'January',
        Booked: 10,
        Rescheduled: 20,
        Canceled: 30,
        Checkedout: 40
    },
    {
        name: 'February',
        Booked: 20,
        Rescheduled: 10,
        Canceled: 40,
        Checkedout: 30
    },
    {
        name: 'March',
        Booked: 30,
        Rescheduled: 40,
        Canceled: 10,
        Checkedout: 20
    },
    {
        name: 'April',
        Booked: 40,
        Rescheduled: 25,
        Canceled: 10,
        Checkedout: 55
    },
    {
        name: 'May',
        Booked: 55,
        Rescheduled: 42,
        Canceled: 30,
        Checkedout: 10
    },
    {
        name: 'June',
        Booked: 20,
        Rescheduled: 24,
        Canceled: 30,
        Checkedout: 50
    },
    {
        name: 'July',
        Booked: 14,
        Rescheduled: 20,
        Canceled: 38,
        Checkedout: 50
    },
    {
        name: 'August',
        Booked: 51,
        Rescheduled: 10,
        Canceled: 50,
        Checkedout: 30
    },
    {
        name: 'September',
        Booked: 20,
        Rescheduled: 24,
        Canceled: 60,
        Checkedout: 70
    },
    {
        name: 'October',
        Booked: 30,
        Rescheduled: 22,
        Canceled: 28,
        Checkedout: 35
    },
    {
        name: 'November',
        Booked: 40,
        Rescheduled: 20,
        Canceled: 60,
        Checkedout: 60
    },
    {
        name: 'December',
        Booked: 10,
        Rescheduled: 20,
        Canceled: 30,
        Checkedout: 40
    },
];


const App = () => {
   
    const modifiedData = data.map((item, index) => ({
        ...item,
        name: index + 1 
    }));

    return (
        <Card sx={{ m: 2, height: '100%', width: '100%' }} elevation={3}>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    width={500}
                    height={300}
                    data={modifiedData}
                    margin={{
                        top: 5,
                        right:  30,
                        left:  20,
                        bottom: 5
                    }}
                >
                    <XAxis dataKey="name"
                        interval={0}
                        padding={{ left: 20, right: 20 }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Booked" stroke="#bfbfbf" activeDot />
                    <Line type="monotone" dataKey="Rescheduled" stroke="#82ca9d" activeDot />
                    <Line type="monotone" dataKey="Canceled" stroke="red" activeDot />
                    <Line type="monotone" dataKey="Checkedout" stroke="#000000" activeDot />
                </LineChart>

            </ResponsiveContainer>
        </Card>
    );
};

export default App;