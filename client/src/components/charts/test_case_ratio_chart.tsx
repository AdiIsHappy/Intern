"use client";
import { TimePeriod } from "@/lib/types/core.types";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import { ChartOptions, TooltipItem } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  LineController
);


export function TestCaseRatioChart({ className }: { className?: string }) {
  const data: {
    testCases: Record<string, number>;
    testCasesRequired: Record<string, number>;
  } = {
    testCases: {
      "2024-06-01T00:00:00.000+05:30": 0,
      "2024-05-01T00:00:00.000+05:30": 0,
      "2024-04-01T00:00:00.000+05:30": 4,
      "2024-03-01T00:00:00.000+05:30": 0,
      "2024-02-01T00:00:00.000+05:30": 1,
      "2024-01-01T00:00:00.000+05:30": 0,
    },
    testCasesRequired: {
      "2024-06-01T00:00:00.000+05:30": 1,
      "2024-05-01T00:00:00.000+05:30": 2,
      "2024-04-01T00:00:00.000+05:30": 8,
      "2024-03-01T00:00:00.000+05:30": 7,
      "2024-02-01T00:00:00.000+05:30": 9,
      "2024-01-01T00:00:00.000+05:30": 3,
    },
  };
  const period: TimePeriod = "month";

  const chartData = {
    labels: Object.keys(data.testCases),
    datasets: [
      {
        label: "Test Added Ratio",
        data: Object.keys(data.testCases).map(
          (date) => data.testCases[date] / data.testCasesRequired[date]
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

  return (
    <Chart
      className={className}
      type="line"
      data={chartData}
      options={options}
    />
  );
}
