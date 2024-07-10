"use client";
import { Quality, TimePeriod } from "@/lib/types/core.types";
import { ChartOptions, TooltipItem } from "chart.js";
import { Bar, Line } from "react-chartjs-2";

export function PRQualityTimeline({
  className,
  data,
  period,
}: {
  className?: string;
  data: Record<string, Record<Quality, number>>;
  period: TimePeriod;
}) {
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
