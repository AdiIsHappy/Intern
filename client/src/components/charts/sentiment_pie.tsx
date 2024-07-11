import { Sentiment } from "@/lib/types/core.types";
import { ChartOptions } from "chart.js";
import { Pie } from "react-chartjs-2";

export interface SentimentPieProps {
  className?: string;
  data: Record<Sentiment, number>;
  title?: string;
}

export function SentimentPieChart({
  data,
  className,
  title = "Sentiment Analysis",
}: SentimentPieProps) {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options: ChartOptions<"pie"> = {
    plugins: {
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = (context.raw as number).toPrecision(2);
            return `${label}: ${value}`;
          },
        },
      },
    },
    responsive: true,
  };

  return <Pie redraw={true} className={className} data={chartData} options={options} />;
}
