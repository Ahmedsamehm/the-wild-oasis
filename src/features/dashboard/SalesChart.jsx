import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

import useRecentBooking from "./useRecentBooking";

import { format, isSameDay } from "date-fns";
// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function SalesChart({ bookingDate }) {
  const { filteredDates } = useRecentBooking();

  const AllData = filteredDates?.map((date) => {
    return {
      labels: format(date, "MM dd"),
      totalSales: bookingDate
        .filter((booking) => isSameDay(date, new Date(booking?.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookingDate
        .filter((booking) => isSameDay(date, new Date(booking?.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  const Chart = {
    labels: AllData?.map((data) => data?.labels),
    datasets: [
      {
        label: "Total Sales",
        data: AllData?.map((data) => data?.totalSales),
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.5)", // Blue with transparency for area
        borderColor: "rgba(54, 162, 235, 1)", // Solid blue border
        tension: 1, // Smooth curve
        pointRadius: 5, // Larger points for visibility
        pointHoverRadius: 7,
        pointBackgroundColor: "white", // White points
        pointBorderColor: "rgba(54, 162, 235, 1)", // Blue border for points
      },
      {
        label: "Extras Sales",
        data: AllData?.map((data) => data.extrasSales),
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.5)", // Red with transparency for area
        borderColor: "rgba(255, 99, 132, 1)", // Solid red border
        tension: 0.4, // Smooth curve
        pointRadius: 5, // Larger points for visibility
        pointHoverRadius: 7,
        pointBackgroundColor: "white", // White points
        pointBorderColor: "rgba(255, 99, 132, 1)", // Red border for points
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to resize properly
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff", // White text for dark mode
          font: {
            size: 14, // Adjust font size for responsiveness
          },
        },
      },
      title: {
        display: true,
        text: `Sales from  ${AllData[AllData.length - 1]?.labels} to ${AllData[0]?.labels}, 2025 `,
        color: "#ffffff", // White text for dark mode
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.raw || 0;
            return `${label}: $${value}`;
          },
          afterLabel: (context) => {
            if (
              context.dataset.label === "Total Sales" &&
              context.label === "02/17"
            ) {
              return "Extras Sales: $450";
            }
            return "";
          },
        },
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff", // White text for dark mode
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Light gray grid lines
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#ffffff", // White text for dark mode
          callback: (value) => `$${value}`,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Light gray grid lines
        },
      },
    },
  };

  return (
    <div className="  p-4 md:p-6">
      <div className=" w-full ">
        <Line data={Chart} options={options} width={500} height={300} />
      </div>
    </div>
  );
}

export default SalesChart;
