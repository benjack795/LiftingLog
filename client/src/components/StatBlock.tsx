import { useState } from 'react';
import '../assets/BootswatchTheme.css';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export const Data = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234
  }
];

const StatBlock = () => {

  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year), 
    datasets: [
      {
        label: "Weight Lifted (KG)",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "white",
        borderWidth: 0.2
      }
    ]
  });

    return (
       <>
        <br/>
          <div className='bg-secondary p-2 rounded-4 chart-container'>
              <Line
                data={chartData}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "EXERCISE progress for YEAR"
                    },
                    legend: {
                      display: false
                    }
                  }
                }}
              />
          </div>
      </>
    )
}

export default StatBlock;