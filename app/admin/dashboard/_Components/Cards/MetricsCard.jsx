"use client";
import React from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";

function MetricsCard({ title, amount, percentage, percentageColor, data }) {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    tooltips: {
      enabled: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: false,
        },
        display: false,
        ticks: {
          display: false,
        },
      },

      y: {
        grid: {
          display: false,
        },

        display: false,
        title: {
          display: false,
        },
        ticks: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
  };

  return (
    <div className="relative p-6 pb-8 overflow-hidden bg-[#F3F4F6] rounded-sm shadow-lg h-full w-full">
      <div className="text-base text-gray-400">{title}</div>
      <div className="relative z-10 flex items-center pt-1">
        <div className="text-2xl font-bold text-gray-900">{amount}</div>
      </div>
      <div className="absolute bottom-0 inset-x-0 z-0">
        <Line height={80} data={data} options={chartOptions} />
      </div>
    </div>
  );
}

export default MetricsCard;
