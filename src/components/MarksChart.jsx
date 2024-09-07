import React from 'react'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement);

function MarksChart({ chartMark }) {
    const chartData = {
        labels: ["Marks", "Cutoff"], // Labels for x-axis
        datasets: [
            {
                label: 'Graph',
                data: [chartMark.marks, chartMark.cutoff], // Data: student marks and cutoff
                backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"], // Colors for bars
                borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"], // Border colors
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: 'Performance',
            },
        },
    };

    return (
        <>
            <Bar data={chartData} options={options} />
        </>
    )
}

export default MarksChart