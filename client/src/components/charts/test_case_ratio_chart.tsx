"use client";
import { TimePeriod } from "@/lib/types/core.types";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import { ChartOptions } from "chart.js";
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
  console.log();
  const period: TimePeriod = "month";

  const chartData = {
    labels: Object.keys(data.testCases),
    datasets: [
      {
        label: "Test Case Ratio",
        data: Object.keys(data.testCases).map(
          (date) => data.testCases[date] / data.testCasesRequired[date]
        ),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options: ChartOptions<"line"> = {
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
