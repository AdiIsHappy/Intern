"use client";

import { Bar } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import { ChartOptions, TooltipItem } from "chart.js";
import { Sentiment } from "@/lib/types/core.types";

export function SkillSentimentChart({
  className,
  data,
}: {
  className?: string;
  data: {
    skill: string;
    sentimentFrequency: Record<string, Record<Sentiment, number>>;
  }[];
}) {
  const chartData = {
    labels: data.map((item) => item.skill),
    datasets: [
      {
        label: "Positive",
        data: data.map((item) =>
          Object.keys(item.sentimentFrequency)
            .map((key) => item.sentimentFrequency[key].Positive)
            .reduce(
              (prevVal: number, currentVal: number) => prevVal + currentVal
            )
        ),
      },
      {
        label: "Neutral",
        data: data.map((item) =>
          Object.keys(item.sentimentFrequency)
            .map((key) => item.sentimentFrequency[key].Neutral)
            .reduce(
              (prevVal: number, currentVal: number) => prevVal + currentVal
            )
        ),
      },
      {
        label: "Negative",
        data: data.map((item) =>
          Object.keys(item.sentimentFrequency)
            .map((key) => item.sentimentFrequency[key].Negative)
            .reduce(
              (prevVal: number, currentVal: number) => prevVal + currentVal
            )
        ),
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    plugins: {
      title: {
        display: true,
        text: "Skill Sentiment Analysis",
      },
      colors: {
        enabled: true,
        forceOverride: true,
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
    interaction: {
      mode: "index",
      intersect: false,
    },
    responsive: true,
    maintainAspectRatio: false,

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
    <Bar
      redraw={true}
      className={className}
      data={chartData}
      options={options}
    />
  );
}
