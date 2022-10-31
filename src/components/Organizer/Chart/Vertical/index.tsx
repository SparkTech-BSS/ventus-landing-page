import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
  //maintainAspectRatio: false
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

export const data = {
  labels,
  datasets: [
    // {
    //   label: 'Dataset 1',
    //   data: [0, 5000, 100000, 20000, 250000, 60000, 80000],
    //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //   borderColor: "#00BE63",
    //   lineTension: 0.4,     
    //   radius: 6
    // },
    {
      label: 'Dataset 2',
      data: [0, 5000, 100000, 20000, 250000, 60000, 80000],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      borderColor: "#00BE63",
      lineTension: 0.4,     
      radius: 6
    },
  ],
};

export function VerticalChart() {
  return <Bar options={options} data={data} height={100}/>;
}
