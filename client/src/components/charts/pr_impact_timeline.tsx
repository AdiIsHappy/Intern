"use client";

import { ChartOptions, TooltipItem } from "chart.js";
import { Bar } from "react-chartjs-2";

export function PRImpactTimeline({ className }: { className?: string }) {
  const data: Record<
    string,
    { Positive: number; Negative: number; Neutral: number }
  > = {
    "2024-06-01T00:00:00.000+05:30": {
      Positive: 1,
      Negative: 1,
      Neutral: 0,
    },
    "2024-05-01T00:00:00.000+05:30": {
      Positive: 2,
      Negative: 0,
      Neutral: 1,
    },
    "2024-04-01T00:00:00.000+05:30": {
      Positive: 8,
      Negative: 1,
      Neutral: 1,
    },
    "2024-03-01T00:00:00.000+05:30": {
      Positive: 6,
      Negative: 0,
      Neutral: 2,
    },
    "2024-02-01T00:00:00.000+05:30": {
      Positive: 9,
      Negative: 0,
      Neutral: 1,
    },
    "2024-01-01T00:00:00.000+05:30": {
      Positive: 3,
      Negative: 0,
      Neutral: 1,
    },
  };
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
