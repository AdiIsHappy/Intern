"use client";
import { TimePeriod } from "@/lib/types/core.types";
import { ChartOptions } from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

export function SkillsFrequencyTimeline({
  className,
  data,
  period,
}: {
  className?: string;
  data: {
    skill: string;
    frequency: Record<string, number>;
  }[];
  period: TimePeriod;
}) {
  console.log("rendering");
  const chartData = {
    labels: data.length > 0 ? Object.keys(data[0].frequency) : [],
    datasets: data.map((item) => ({
      label: item.skill,
      data: Object.keys(item.frequency).map(
        (key) => item.frequency[key as keyof typeof item.frequency]
      ),
    })),
  };

  const options: ChartOptions<"line"> = {
    plugins: {
      title: {
        display: true,
        text: "Skill Frequency Timeline",
      },
      colors: {
        enabled: true,
        forceOverride: true,
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

    responsive: true,
    maintainAspectRatio: false,
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
          text: "Period",
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

  return <Line redraw={true} className={className} data={chartData} options={options} />;
}
