import '../assets/BootswatchTheme.css';
import leftarrow from '../assets/caret-left-fill.svg';
import rightarrow from '../assets/caret-right-fill.svg';
import DayBlock from './DayBlock';

const monthnames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const monthdays = [31,28,31,30,31,30,31,31,30,31,30,31];


const Calendar = () => {

    var d:Date = new Date(Date.now());

    var dayarray = Array();
    for(var i = 1; i <= monthdays[d.getMonth()-1]+1; i++){
        dayarray.push(i);
    }

    return (
        <>
            <br/><br/>
            <div className='d-flex justify-content-center'>
                <div className='d-inline-flex p-2 bg-secondary rounded-4 w-25 justify-content-between'>
                    <button type="button" className="btn btn-primary">
                        <img src={leftarrow}/>
                    </button>
                    <h2>{monthnames[d.getMonth()] + " " + d.getFullYear()}</h2>
                    <button type="button" className="btn btn-primary">
                        <img src={rightarrow}/>
                    </button>
                </div>
            </div>
            <br/><br/>
            <div className='d-flex justify-content-center'>
                <div className='bg-secondary w-75 rounded-4'>
                    {dayarray.map((num:number) => (
                        <DayBlock daynum={num}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Calendar;