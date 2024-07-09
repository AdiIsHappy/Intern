"use client";

import { ChartOptions, TooltipItem } from "chart.js";
import { Bar } from "react-chartjs-2";

export function PRImpactTimeline({
  className,
  data,
}: {
  className?: string;
  data: Record<string, { Positive: number; Negative: number; Neutral: number }>;
}) {
  const period = "month";
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Positive",
        data: Object.keys(data).map((date) => data[date].Positive),
      },
      {
        label: "Neutral",
        data: Object.keys(data).map((date) => data[date].Negative),
      },
      {
        label: "Negative",
        data: Object.keys(data).map((date) => data[date].Neutral),
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    plugins: {
      title: {
        display: true,
        text: `PR Impact Timeline (${period})`,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem: TooltipItem<"bar">) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.parsed}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        type: "time",
        time: {
          unit: period,
        },
      },
      y: {
        beginAtZero: true,
        stacked: true,
      },
    },
  };
  return <Bar options={options} data={chartData} className={className} />;
}
