import { useEffect, useState } from 'react';
import '../assets/BootswatchTheme.css';
import leftarrow from '../assets/caret-left-fill.svg';
import rightarrow from '../assets/caret-right-fill.svg';
import DayBlock from './DayBlock';
import { StatBlock }  from './StatBlock';
import { Col, Container, Row } from 'react-bootstrap';
import CalendarBlock from './CalendarBlock';

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
            <CalendarBlock dategiven={pageDate} lifts={lifts} photos={photos} fetchData={fetchData}></CalendarBlock>
            <Container>
                    <Row>
                    <Col>
                        <StatBlock extype={1} curdate={pageDate} inlifts={lifts} />
                    </Col>
                    <Col>
                        <StatBlock extype={2} curdate={pageDate} inlifts={lifts}/>
                    </Col>
                    <Col>
                        <StatBlock extype={3} curdate={pageDate} inlifts={lifts}/>
                    </Col>
                    </Row>
            </Container>


        </>
    )
}

export default Calendar;