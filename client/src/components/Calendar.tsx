import { useEffect, useState } from 'react';
import '../assets/BootswatchTheme.css';
import leftarrow from '../assets/caret-left-fill.svg';
import rightarrow from '../assets/caret-right-fill.svg';
import DayBlock from './DayBlock';

const monthnames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const monthdays = [31,28,31,30,31,30,31,31,30,31,30,31];
const daynames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

const Calendar = () => {

    const curdat = new Date();
    const firstdat = new Date(curdat.getFullYear(), curdat.getMonth(), 1);
    const [pageDate,setPageDate] = useState<Date>(firstdat);
    const [lifts, setLifts] = useState([]);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        console.log('refetching')

        fetch('http://localhost:5000/lifts/specific', { 
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST", 
            body: JSON.stringify({ pagedate : pageDate})
        })
        .then((response) => response.text())
        .then((data) => {
            if(data != ''){
                setLifts(JSON.parse(data)) 
            }
        });

        fetch('http://localhost:5000/photos/specific', { 
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST", 
            body: JSON.stringify({ pagedate : pageDate})
        })
        .then((response) => response.text())
        .then((data) => {
            if(data != ''){
                setPhotos(JSON.parse(data)) 
            }
        });
    }

        var dayarray : number[] = []
        var daynum = monthdays[pageDate.getMonth()];
        if(pageDate.getMonth() === 1 && pageDate.getFullYear() % 4 === 0){
             daynum = 29;
        }
        var finalday = (pageDate.getDay() < 1 ? 7 : pageDate.getDay());


        for(var i = 1; i < finalday; i++){
            dayarray.push(-i) 
        }

        for(var i = 1; i <= daynum; i++){
            dayarray.push(i)
        }

    const incrementPageDate = () => {
        setPageDate(new Date(pageDate.setMonth(pageDate.getMonth()+1)));
        fetchData();
    }

    const decrementPageDate = () => {
        setPageDate(new Date(pageDate.setMonth(pageDate.getMonth()-1)));
        fetchData();
    }

    return (
        <>
            <br/>
            <div className='d-flex justify-content-center'>
                <div className='d-inline-flex p-2 bg-secondary rounded-4 w-25 justify-content-between'>
                    <button className="btn btn-primary" onClick={decrementPageDate}>
                        <img src={leftarrow}/>
                    </button>
                    <h3>{monthnames[pageDate.getMonth()] + " " + pageDate.getFullYear()}</h3>
                    <button className="btn btn-primary" onClick={incrementPageDate}>
                        <img src={rightarrow}/>
                    </button>
                </div>
            </div>
            <br/>
            <div className='d-flex justify-content-center'>
                <div className='bg-secondary rounded-4 p-1'>
                    <div className='d-flex flex-row'>
                        {daynames.map((day:string) => (
                                <div key={day} className='p-1 w-100 text-center rounded-4'>
                                    <h5>{day}</h5>
                                </div>
                        ))}
                    </div>    
                    {[0,1,2,3,4,5].map((rowval : number) => {
                        return (
                            <div key={rowval} className='d-flex flex-row'>
                                {dayarray.slice(rowval*7,(rowval+1)*7).map((val: any) => {
                                    var blockdate = new Date(pageDate.getFullYear(), pageDate.getMonth(), val, 12, 12, 12)
                                    var contents = Array()
                                    lifts.forEach((lift : any) => {
                                        var compdate = new Date(lift.date)
                                        if(compdate.getFullYear() == blockdate.getFullYear() && compdate.getMonth() == blockdate.getMonth() && compdate.getDate() == blockdate.getDate()){
                                            contents.push(lift)
                                        }
                                    })
                                    var photocontents = Array()
                                    photos.forEach((photo : any) => {
                                        var photocompdate = new Date(photo.date)
                                        if(photocompdate.getFullYear() == blockdate.getFullYear() && photocompdate.getMonth() == blockdate.getMonth() && photocompdate.getDate() == blockdate.getDate()){
                                            photocontents.push(photo)
                                        }
                                    })
                                    return (
                                        <div key={val} className='p-1'>
                                            <DayBlock daynum={val} dateraw={blockdate} content={contents} photos={photocontents} fetchData={fetchData}/>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
            <br/>
        </>
    )
}

export default Calendar;