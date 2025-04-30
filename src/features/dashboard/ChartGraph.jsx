import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  elements,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Header from "../../UI/Header";

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartGraph({ bookingDate }) {
  const NightRanges = bookingDate?.reduce(
    (acc, N) => {
      const Nights = N.numNights;
      if (Nights >= 1 && Nights <= 3) {
        acc["1-3"] += 1;
      } else if (Nights >= 4 && Nights <= 5) {
        acc["4-5"] += 1;
      } else if (Nights >= 6 && Nights <= 10) {
        acc["6-10"] += 1;
      } else if (Nights >= 11 && Nights <= 15) {
        acc["11-15"] += 1;
      } else if (Nights >= 16 && Nights <= 20) {
        acc["16-20"] += 1;
      } else if (Nights >= 21 && Nights <= 25) {
        acc["21-25"] += 1;
      }
      return acc;
    },
    {
      "1-3": 0,
      "4-5": 0,
      "6-10": 0,
      "11-15": 0,
      "16-20": 0,
      "21-25": 0,
    }
  );

  const TotalBookings = bookingDate?.length;
  const percentages = Object.keys(NightRanges).map((key) => {
    return Math.round((NightRanges[key] / TotalBookings) * 100);
  });

  const data = {
    labels: [
      "1-3Night",
      "4-5Night",
      "6-10Night",
      "11-15Night",
      "16-20Night",
      "21-25Night",
    ],
    datasets: [
      {
        label: "Website Traffic",
        data: percentages,
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)", // Light Blue for 1-3 Nights
          "rgba(255, 206, 86, 0.2)", // Light Yellow for 4-5 Nights
          "rgba(75, 192, 192, 0.2)", // Light Turquoise for 6-10 Nights
          "rgba(153, 102, 255, 0.2)", // Light Purple for 11-15 Nights
          "rgba(255, 159, 64, 0.2)", // Light Orange for 16-20 Nights
          "rgba(255, 99, 132, 0.2)", // Light Red for 21-25 Nights
        ],
        borderColor: [
          "rgba(54, 162, 235, 0.5)", // Light border for 1-3 Nights
          "rgba(255, 206, 86, 0.5)", // Light border for 4-5 Nights
          "rgba(75, 192, 192, 0.5)", // Light border for 6-10 Nights
          "rgba(153, 102, 255, 0.5)", // Light border for 11-15 Nights
          "rgba(255, 159, 64, 0.5)", // Light border for 16-20 Nights
          "rgba(255, 99, 132, 0.5)", // Light border for 21-25 Nights
        ],
        borderWidth: 2,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to resize properly
    plugins: {
      legend: {
        position: "bottom",
        hight: 100,
        labels: {
          color: "#ffffff", // White text for dark mode
          font: {
            size: 13, // Adjust font size for responsiveness
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  return (
    <div className=" w-full p-4 md:p-6">
      <div className="flex   items-center mb-3">
        <Header>Stay duration summary</Header>
      </div>

      <div className=" w-full flex justify-center items-center ">
        <Doughnut data={data} options={options} width={400} height={240} />
      </div>
    </div>
  );
}

export default ChartGraph;
