import { useState } from 'react';
import '../assets/BootswatchTheme.css';
import leftarrow from '../assets/caret-left-fill.svg';
import rightarrow from '../assets/caret-right-fill.svg';
import DayBlock from './DayBlock';

const monthnames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const monthdays = [31,28,31,30,31,30,31,31,30,31,30,31];


const Calendar = () => {

    const [pageDate,setPageDate] = useState<Date>(new Date)

    var dayarray = Array();
    var daynum = monthdays[pageDate.getMonth()];
    if(pageDate.getMonth() === 1 && pageDate.getFullYear() % 4 === 0){
        daynum = 29;
    }
    for(var i = 1; i <= daynum; i++){
        dayarray.push(i);
    }

    const incrementPageDate = () => {
        setPageDate(new Date(pageDate.setMonth(pageDate.getMonth()+1)));
    }

    const decrementPageDate = () => {
        setPageDate(new Date(pageDate.setMonth(pageDate.getMonth()-1)));
    }

    return (
        <>
            <br/><br/>
            <div className='d-flex justify-content-center'>
                <div className='d-inline-flex p-2 bg-secondary rounded-4 w-25 justify-content-between'>
                    <button type="button" className="btn btn-primary" onClick={decrementPageDate}>
                        <img src={leftarrow}/>
                    </button>
                    <h2>{monthnames[pageDate.getMonth()] + " " + pageDate.getFullYear()}</h2>
                    <button type="button" className="btn btn-primary" onClick={incrementPageDate}>
                        <img src={rightarrow}/>
                    </button>
                </div>
            </div>
            <br/><br/>
            <div className='d-flex justify-content-center'>
                <div className='bg-secondary w-75 rounded-4'>
                    <div className='d-flex flex-row'>
                        {dayarray.slice(0,7).map((num:number) => (
                            <DayBlock daynum={num}/>
                        ))}
                    </div>
                    <div className='d-flex flex-row'>
                        {dayarray.slice(7,14).map((num:number) => (
                            <DayBlock daynum={num}/>
                        ))}
                    </div>
                    <div className='d-flex flex-row'>
                        {dayarray.slice(14,21).map((num:number) => (
                            <DayBlock daynum={num}/>
                        ))}
                    </div>
                    <div className='d-flex flex-row'>
                        {dayarray.slice(21,28).map((num:number) => (
                            <DayBlock daynum={num}/>
                        ))}
                    </div>
                    <div className='d-flex flex-row'>
                        {dayarray.slice(28,dayarray.length).map((num:number) => (
                            <DayBlock daynum={num}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Calendar;