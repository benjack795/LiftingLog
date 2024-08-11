import '../assets/BootswatchTheme.css';
import { Line } from 'react-chartjs-2';
import { Chart, registerables} from 'chart.js';
Chart.register(...registerables);

const monthnames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const StatBlock = ({dotcolor, extype, curdate, inlifts} : {dotcolor : string, extype: number, curdate: Date, inlifts: any}) => {

  var filteredLifts = Array()
  inlifts.forEach((element : any) => {
      if(element.extype == extype){
        filteredLifts.push({x: new Date(element.date).getDate(), y: element.weight})
      }
  });

  for (let i = 0; i < filteredLifts.length; i++) {
    var smallestOne = i
    for (let j = (i + 1); j < filteredLifts.length; j++) {
      if (filteredLifts[j].x < filteredLifts[smallestOne].x){
        smallestOne = j
      }
    }
    var temp = filteredLifts[i]
    filteredLifts[i] = filteredLifts[smallestOne]
    filteredLifts[smallestOne] = temp
  }

  var finalLifts = Array();
  for (let i = 0; i < 32; i++) {
    let largestone = -1
    let largestindex = -1
    for (let j = 0; j < filteredLifts.length; j++) {
      if(filteredLifts[j].x == i && filteredLifts[j].y > largestone){
        largestindex = j
        largestone = filteredLifts[j].y
      }
    }
    if(!(largestone == -1 && largestindex == -1)){
      finalLifts.push(filteredLifts[largestindex])
    }
  }

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
    labels: finalLifts.map((data) => data.x), 
    datasets: [
      {
        data: finalLifts.map((data) => data.y),
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