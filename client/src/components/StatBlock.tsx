import '../assets/BootswatchTheme.css';
import { Line } from 'react-chartjs-2';
import { Chart, registerables} from 'chart.js';
Chart.register(...registerables);

const monthnames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const StatBlock = ({dotcolor, extype, curdate, inlifts} : {dotcolor : string, extype: number, curdate: Date, inlifts: any}) => {

  const filteredLifts = Array()
  inlifts.forEach((element : any) => {
      if(element.extype == extype){
        filteredLifts.push({x: new Date(element.date).getDate(), y: element.weight})
      }
  });

  const getExType = (typenum: number) => {
    switch(typenum){
      case 1:
        return 'Squat'
      case 2:
        return 'Benchpress'
      case 3:
        return 'Deadlift'
    }
  }

  const data = {
    labels: filteredLifts.map((data) => data.x), 
    datasets: [
      {
        data: filteredLifts.map((data) => data.y),
        backgroundColor: [
          dotcolor
        ],
        borderColor: "white",
        borderWidth: 1,
        pointRadius: 6
      },
    ],
  }

  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Day",
          color: "gray"
        },
        ticks: {
          color: "gray"
        }
      },
      y: {
        beginAtZero: false,
      },
    },
    plugins: {
      tooltip:{
        enabled: false
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: getExType(extype) + " Progress for " + monthnames[curdate.getMonth()] + " " + curdate.getFullYear() + " (KG)",
        font: {
          size: 15,
        },
        color: "white"
      }
    },
    
  }

    return (
       <>
        <br/>
          <div className='bg-secondary p-2 rounded-4 chart-container'>
            <Line data={data} options={options} />
          </div>
      </>
    )
}

export default StatBlock;