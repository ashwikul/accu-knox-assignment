import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StackedChart = ({ segments }) => {
  const data = {
    labels: [""], // Single label for the progress bar
    datasets: segments.map((segment, index) => ({
      label: `${segment.label}(${segment.value})`, // Segment label (optional)
      data: [segment.value], // Value of the segment
      backgroundColor: segment.color, // Segment color
      barThickness: 20, // Height of the progress bar
      hoverOffset: 4,
    })),
  };

  const total = segments.reduce((sum, segment) => sum + segment.value, 0);

  const options = {
    indexAxis: "y", // Horizontal bar
    responsive: true,
    scales: {
      x: {
        stacked: true,
        display: false, // Hide the X-axis
        max: total, // Assuming the sum of segments equals 100%
      },
      y: {
        stacked: true,
        display: false, // Hide the Y-axis
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "rectRounded",
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    layout: {
      padding: 0, // Remove any padding for a tighter fit
    },
  };

  return <Bar data={data} options={options} />;
};

export default StackedChart;
