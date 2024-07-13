"use client";
import {
  Chart as ChartJS,
  Colors,
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  Legend,
  Tooltip,
  PointElement,
  LineElement,
  LineController,
  TimeScale,
  PieController,
  ArcElement,
} from "chart.js";

import "chartjs-adapter-luxon";

ChartJS.register(
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  LineController,
  TimeScale,
  PieController,
  ArcElement,
  Title,
  Legend,
  Tooltip,
  Colors
);

ChartJS.defaults.borderColor = "rgba(0, 0, 0, 0.2)";
