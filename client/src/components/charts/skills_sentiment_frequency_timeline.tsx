"use client";
import { ChartOptions } from "chart.js";
import { Chart } from "react-chartjs-2";

export function SkillSentimentFrequencyTimeline({
  className,
}: {
  className?: string;
}) {
  const data: Record<string, Record<string, number>> = {
    Positive: {
      "2024-03-01T00:00:00.000+05:30": 4,
      "2024-04-01T00:00:00.000+05:30": 3,
      "2024-05-01T00:00:00.000+05:30": 3,
      "2024-06-01T00:00:00.000+05:30": 1,
      "2024-07-01T00:00:00.000+05:30": 0,
    },
    Negative: {
      "2024-03-01T00:00:00.000+05:30": 2,
      "2024-04-01T00:00:00.000+05:30": 3,
      "2024-05-01T00:00:00.000+05:30": 0,
      "2024-06-01T00:00:00.000+05:30": 0,
      "2024-07-01T00:00:00.000+05:30": 1,
    },
    Neutral: {
      "2024-03-01T00:00:00.000+05:30": 3,
      "2024-04-01T00:00:00.000+05:30": 5,
      "2024-05-01T00:00:00.000+05:30": 4,
      "2024-06-01T00:00:00.000+05:30": 3,
      "2024-07-01T00:00:00.000+05:30": 0,
    },
  };
  const colors: Record<string, string> = {
    Positive: "green",
    Negative: "red",
    Neutral: "skyblue",
  };
  const chartData = {
    labels: Object.keys(data.Positive),
    datasets: Object.keys(data).map((sentiment) => ({
      label: sentiment,
      data: Object.keys(data[sentiment]).map((date) => data[sentiment][date]),
      backgroundColor: colors[sentiment],
      borderColor: colors[sentiment],
    })),
  };
  const options: ChartOptions<"line"> = {
    plugins: {
      title: {
        display: true,
        text: "Skill Frequency Timeline",
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
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
          unit: "month",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Frequency",
        },
      },
    },
  };

  return (
    <Chart
      className={className}
      data={chartData}
      type="line"
      options={options}
    />
  );
}
