"use client";

import { Sentiment, TimePeriod } from "@/lib/types/core.types";
import { ChartOptions, TooltipItem } from "chart.js";
import { Bar } from "react-chartjs-2";

export function PRImpactTimeline({
  className,
  data,
  period,
}: {
  className?: string;
  data: Record<string, Record<Sentiment, number>>;
  period: TimePeriod;
}) {

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Positive",
        data: Object.keys(data).map((date) => data[date].Positive),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Neutral",
        data: Object.keys(data).map((date) => data[date].Neutral),
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
      {
        label: "Negative",
        data: Object.keys(data).map((date) => data[date].Negative),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
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
    maintainAspectRatio: false,
    responsive: true,
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

  return <Bar  redraw={true} options={options} data={chartData} className={className} />;
}
