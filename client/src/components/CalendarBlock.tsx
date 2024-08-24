import '../assets/BootswatchTheme.css';
import DayBlock from './DayBlock';
import { Lift, Photo } from './Types';

//arrays of number of days per month and days of the week for drawing the calendar
const monthdays = [31,28,31,30,31,30,31,31,30,31,30,31];
const daynames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

//block holding the day objects
const CalendarBlock = ({dategiven, lifts, photos, fetchData} : {dategiven :Date, lifts: Lift[], photos: Photo[], fetchData: () => void}) => {
    
    //define the array of days to generate from, the number of days in the month (including leap years) and the final day of each month
    //the final day determines how many empty space blocks to push to the calendar
    let dayarray : number[] = [];
    let daynum = monthdays[dategiven.getMonth()];
    if(dategiven.getMonth() === 1 && dategiven.getFullYear() % 4 === 0){
         daynum = 29;
    }
    let finalday = (dategiven.getDay() < 1 ? 7 : dategiven.getDay());

    //populate the array with values
    for(let i = 1; i < finalday; i++){
        dayarray.push(-i);
    }
    for(let j = 1; j <= daynum; j++){
        dayarray.push(j);
    }   

    //return a row of day names, then
    //for each of the maximum of five sets of seven values in the day array, add to a grid of dayblocks
    //whilst doing this, filter the lifts and photos fetched by the parent object to each appropriate dayblock
    return (
        <>
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
                                {dayarray.slice(rowval*7,(rowval+1)*7).map((val: number) => {
                                    let blockdate = new Date(dategiven.getFullYear(), dategiven.getMonth(), val, 12, 12, 12);
                                    let contents: Lift[] = [];
                                    lifts.forEach((lift : Lift) => {
                                        let compdate = new Date(lift.date);
                                        if(compdate.getFullYear() === blockdate.getFullYear() && compdate.getMonth() === blockdate.getMonth() && compdate.getDate() === blockdate.getDate()){
                                            contents.push(lift);
                                        }
                                    })
                                    let photocontents : Photo[] = [];
                                    photos.forEach((photo : Photo) => {
                                        let photocompdate = new Date(photo.date);
                                        if(photocompdate.getFullYear() === blockdate.getFullYear() && photocompdate.getMonth() === blockdate.getMonth() && photocompdate.getDate() === blockdate.getDate()){
                                            photocontents.push(photo);
                                        }
                                    })
                                    return (
                                        <div role={val.toString()} key={val} className='p-1'>
                                            <DayBlock daynum={val} dateraw={blockdate} content={contents} photos={photocontents} fetchData={fetchData}/>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default CalendarBlock;