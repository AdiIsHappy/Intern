"use client";
import { ChartOptions, TooltipItem } from "chart.js";
import { Bar, Line } from "react-chartjs-2";

export function PRQualityTimeline({ className }: { className?: string }) {
  const data: Record<string, { High: number; Low: number; Medium: number }> = {
    "2024-06-01T00:00:00.000+05:30": {
      High: 1,
      Low: 1,
      Medium: 0,
    },
    "2024-05-01T00:00:00.000+05:30": {
      High: 2,
      Low: 0,
      Medium: 1,
    },
    "2024-04-01T00:00:00.000+05:30": {
      High: 8,
      Low: 1,
      Medium: 1,
    },
    "2024-03-01T00:00:00.000+05:30": {
      High: 6,
      Low: 0,
      Medium: 2,
    },
    "2024-02-01T00:00:00.000+05:30": {
      High: 9,
      Low: 0,
      Medium: 1,
    },
    "2024-01-01T00:00:00.000+05:30": {
      High: 3,
      Low: 0,
      Medium: 1,
    },
  };
  const period = "month";
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "High",
        data: Object.keys(data).map((date) => data[date].High),
      },
      {
        label: "Medium",
        data: Object.keys(data).map((date) => data[date].Medium),
      },
      {
        label: "Low",
        data: Object.keys(data).map((date) => data[date].Low),
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    plugins: {
      title: {
        display: true,
        text: "PR Quality Timeline",
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context: TooltipItem<"bar">) {
            const label = context.dataset.label || "";
            const value = (context.raw as number).toPrecision(2);
            return `${label}: ${value}`;
          },
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: period,
        },
        title: {
          display: true,
          text: "Timeline",
        },
        stacked: true,
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Count",
        },
      },
    },
  };

  return <Bar data={chartData} className={className} options={options} />;
}
