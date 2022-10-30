import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function XyChart(props) {
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
      var xydata = []
      var sortedkey = []    
      for (const [key, value] of Object.entries(props.pdata)) {
        sortedkey = sortedkey.concat(Object.keys(value));
      }
        sortedkey = [...new Set(sortedkey)];
        console.log("chart key: " + sortedkey)
      for(const key of Object.keys(props.pdata)){
        const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
        const r = randomBetween(0, 255);
        const g = randomBetween(0, 255);
        const b = randomBetween(0, 255);
            xydata.push({label: key, data: sortedkey.map((x)=> props.pdata[key][x]/props.pop),
              borderColor: `rgba(${r}, ${g}, ${b}, 0.5)`,
              backgroundColor: `rgba(${r}, ${g}, ${b}, 0.5)`,
            })
          
      }
      const data = {
        // years key
        labels: Object.keys(props.pdata[Object.keys(props.pdata)[0]]),
        datasets: xydata
      };
  return <Line options={options} data={data} />;
}
