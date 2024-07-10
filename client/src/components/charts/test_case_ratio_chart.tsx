"use client";
import { TimePeriod } from "@/lib/types/core.types";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import { ChartOptions, TooltipItem } from "chart.js";

export interface TestCaseRatioProps {
  className?: string;
  testCases: Record<string, number>;
  testCasesRequired: Record<string, number>;
  period: TimePeriod;
}

export function TestCaseRatioChart({
  className,
  testCases,
  testCasesRequired,
  period,
}: TestCaseRatioProps) {
  const chartData = {
    labels: Object.keys(testCases),
    datasets: [
      {
        label: "Test Added Ratio",
        data: Object.keys(testCases).map(
          (date) => testCases[date] / testCasesRequired[date]
        ),
      },
    ],
  };
  const options: ChartOptions<"line"> = {
    plugins: {
      title: {
        display: true,
        text: "Test Added Ratio",
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context: TooltipItem<"line">) {
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
      },
      y: {
        title: {
          display: true,
          text: "merge requests with testcases/merge requests",
        },
      },
    },
  };

  return <Line className={className} data={chartData} options={options} />;
}
