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
} from "chart.js";

ChartJS.register(
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  LineController,
  TimeScale,
  Title,
  Legend,
  Tooltip,
  Colors
);
