'use client'
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    BarController,
    BarElement,
  } from "chart.js";
  import { Bar } from "react-chartjs-2";
  
  // Register ChartJS components using ChartJS.register
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarController,
    BarElement,
    Tooltip
  );

  const MyLineChart = () => {
    const data = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
        datasets: [
          {
            label: 'Vendas Mensais',
            data: [12, 19, 3, 5, 2],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

      return (
        <div style={{ width: '400px', height: '400px' }}>
          <Bar data={data} />
        </div>
      );
  };
  export default MyLineChart;

  

  

