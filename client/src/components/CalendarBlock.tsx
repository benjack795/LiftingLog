import { useEffect, useState } from 'react';
import '../assets/BootswatchTheme.css';
import leftarrow from '../assets/caret-left-fill.svg';
import rightarrow from '../assets/caret-right-fill.svg';
import DayBlock from './DayBlock';
import { StatBlock }  from './StatBlock';
import { Col, Container, Row } from 'react-bootstrap';

const monthnames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const monthdays = [31,28,31,30,31,30,31,31,30,31,30,31];
const daynames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

const CalendarBlock = ({dategiven, lifts, photos, fetchData} : {dategiven :Date, lifts: any, photos: any, fetchData: () => void}) => {
    
    var dayarray : number[] = []
    var daynum = monthdays[dategiven.getMonth()];
    if(dategiven.getMonth() === 1 && dategiven.getFullYear() % 4 === 0){
         daynum = 29;
    }
    var finalday = (dategiven.getDay() < 1 ? 7 : dategiven.getDay());


    for(var i = 1; i < finalday; i++){
        dayarray.push(-i) 
    }

    for(var i = 1; i <= daynum; i++){
        dayarray.push(i)
    }   

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
                                {dayarray.slice(rowval*7,(rowval+1)*7).map((val: any) => {
                                    var blockdate = new Date(dategiven.getFullYear(), dategiven.getMonth(), val, 12, 12, 12)
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
                                        <div role={val} key={val} className='p-1'>
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

export default CalendarBlock