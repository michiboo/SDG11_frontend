import React, { useEffect } from 'react';
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
import { faker } from '@faker-js/faker';
import { useSlotProps } from '@mui/base';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



export function BarChart(props) {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: props.title,
          },
        },
      };
      
      const dLabels = props.labels;
      var fdata = [];
      fdata.push({
        label: "Dataset 1",
        data: Object.values(props.pdata),
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      },)
      const pdata = {dLabels, datasets:  fdata};
const data = {
  labels: Object.keys(props.pdata),
  datasets: [
    {
      label: props.cityname,
      data: Object.values(props.pdata).map((x) => x/props.pop),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};
      
  return (<Bar options={options} data={data} />);
}