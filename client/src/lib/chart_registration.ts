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
  // RadarController,
  // RadialLinearScale,
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
  // RadarController,
  // RadialLinearScale,
  Title,
  Legend,
  Tooltip,
  Colors
);
