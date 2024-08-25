import '../assets/BootswatchTheme.css';
import { Line } from 'react-chartjs-2';
import { Chart, registerables} from 'chart.js';
import { Lift, StatData } from './Types';
Chart.register(...registerables);


//array of month names, used for graph titles
const monthnames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

//method to filter lifts passed in into appropriate graph format
export const liftFilter = (lifts : Lift[], exercise : number) => {

  //set dot color to red, blue or green to match the colour of the exercise buttons
  let dotcolor = "";
  switch(exercise){
    case 1:
      dotcolor = "rgba(0, 255, 169, 1)";
      break;
    case 2:
      dotcolor = "rgba(0, 194, 255, 1)";
      break;
    case 3:
      dotcolor = "rgba(255, 0, 0, 1)";
      break;
  };

  //create the filtered array, and filter out other exercises
  let filteredLifts : StatData[] = [];
  lifts.forEach((element : Lift) => {
        if(element.extype === exercise){
          filteredLifts.push({x: new Date(element.date).getDate(), y: element.weight});
        }
  });
    
  //order the array by day value
  for (let i = 0; i < filteredLifts.length; i++) {
    let smallestOne = i;
    for (let j = (i + 1); j < filteredLifts.length; j++) {
      if (filteredLifts[j].x < filteredLifts[smallestOne].x){
        smallestOne = j;
      }
    };
    let temp = filteredLifts[i];
    filteredLifts[i] = filteredLifts[smallestOne];
    filteredLifts[smallestOne] = temp;
  };

  //for each day value of the array, if there are multiple with the same, only keep the highest
  let finalLifts: StatData[] = [];
  for (let i = 0; i < 32; i++) {
    let largestone = -1;
    let largestindex = -1;
    for (let j = 0; j < filteredLifts.length; j++) {
      if(filteredLifts[j].x === i && filteredLifts[j].y > largestone){
        largestindex = j;
        largestone = filteredLifts[j].y;
      }
    };
    if(!(largestone === -1 && largestindex === -1)){
      finalLifts.push(filteredLifts[largestindex]);
    };
  };

  //configure to charts.js format
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
  };

  return data;
}

//div containing a charts.js chart, used for stats
export const StatBlock = ({extype, curdate, inlifts} : {extype: number, curdate: Date, inlifts: Lift[]}) => {

  //set title based on exercise
  const getExType = (typenum: number) => {
    switch(typenum){
      case 1:
        return 'Squat'
      case 2:
        return 'Benchpress'
      case 3:
        return 'Deadlift'
    }
  };

  //define graph style options
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
  };

  //return div contatining a line graph that has been passed the data and options
    return (
       <>
        <br/>
          <div className='bg-secondary p-2 rounded-4 chart-container'>
            <Line data={liftFilter(inlifts, extype)} options={options} />
          </div>
      </>
    )
}