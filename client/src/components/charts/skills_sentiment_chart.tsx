"use client";

import { Chart } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import { ChartOptions, TooltipItem } from "chart.js";
import {
  Chart as ChartJS,
  BarController,
  Title,
  LinearScale,
  BarElement,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  Legend,
  Tooltip
);

export function SkillSentimentChart({ className }: { className?: string }) {
  const data = [
    {
      skill: "Android",
      frequency: 35,
      sentimentFrequency: {
        Positive: 14,
        Negative: 4,
        Neutral: 11,
      },
    },
    {
      skill: "Java",
      frequency: 26,
      sentimentFrequency: {
        Positive: 9,
        Negative: 5,
        Neutral: 12,
      },
    },
    {
      skill: "Kotlin",
      frequency: 16,
      sentimentFrequency: {
        Positive: 10,
        Negative: 2,
        Neutral: 4,
      },
    },
    {
      skill: "Code Review",
      frequency: 3,
      sentimentFrequency: {
        Positive: 3,
        Negative: 0,
        Neutral: 0,
      },
    },
    {
      skill: "Git",
      frequency: 3,
      sentimentFrequency: {
        Positive: 2,
        Negative: 0,
        Neutral: 1,
      },
    },
    {
      skill: "UI/UX Design",
      frequency: 1,
      sentimentFrequency: {
        Positive: 1,
        Neutral: 0,
        Negative: 0,
      },
    },
    {
      skill: "SQLite",
      frequency: 2,
      sentimentFrequency: {
        Positive: 2,
        Neutral: 0,
        Negative: 0,
      },
    },
  ];
  const chartData = {
    labels: data.map((item) => item.skill),
    datasets: [
      {
        label: "Negative",
        data: data.map((item) => item.sentimentFrequency.Negative),
        backgroundColor: "rgba(228, 8, 10, 0.6)",
        borderColor: "rgba(228, 8, 10, 1)",
        borderWidth: 2,
      },
      {
        label: "Neutral",
        data: data.map((item) => item.sentimentFrequency.Neutral),
        backgroundColor: "rgba(93, 226, 231, 0.6)",
        borderColor: "rgba(93, 226, 231, 1)",
        borderWidth: 2,
      },
      {
        label: "Positive",
        data: data.map((item) => item.sentimentFrequency.Positive),
        backgroundColor: "rgba(125, 218, 88, 0.6)",
        borderColor: "rgba(125, 218, 88, 1)",
        borderWidth: 2,
      },
    ],
  };
  const options: ChartOptions<"bar"> = {
    plugins: {
      title: {
        display: true,
        text: "Skill Sentiment Analysis",
        color: "black",
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context: TooltipItem<"bar">) {
            const label = context.dataset.label || "";
            const value = context.raw as number;
            return `${label}: ${value}`;
          },
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Skills",
        },
        stacked: true,
      },
      y: {
        title: {
          display: true,
          text: "Frequency",
        },
        stacked: true,
      },
    },
  };
  return (
    <Chart
      className={className}
      type="bar"
      data={chartData}
      options={options}
    />
  );
}
