import { useEffect, useState } from 'react';
import '../assets/BootswatchTheme.css';
import leftarrow from '../assets/caret-left-fill.svg';
import rightarrow from '../assets/caret-right-fill.svg';
import { StatBlock }  from './StatBlock';
import { Col, Container, Row } from 'react-bootstrap';
import CalendarBlock from './CalendarBlock';

//array for displaying month names
const monthnames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

//div holding the calendarblock and statblocks
const Calendar = () => {

    //defining datestate as the start of the month and schema states as empty
    const curdat = new Date();
    const firstdat = new Date(curdat.getFullYear(), curdat.getMonth(), 1);
    const [pageDate,setPageDate] = useState<Date>(firstdat);
    const [lifts, setLifts] = useState([]);
    const [photos, setPhotos] = useState([]);

    //fetching lift and photo data from the api to populate the calendar and graphs
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
            if(data !== ''){
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
            if(data !== ''){
                setPhotos(JSON.parse(data)) 
            }
        });
    }
    
    //methods for incrementing and decrementing the date, called when the left/right arrows are clicked
    const incrementPageDate = () => {
        setPageDate(new Date(pageDate.setMonth(pageDate.getMonth()+1)));
        fetchData();
    }

    const decrementPageDate = () => {
        setPageDate(new Date(pageDate.setMonth(pageDate.getMonth()-1)));
        fetchData();
    }

    //return the date adjuster section, calendar block, and a group of three stat blocks, one for each exercise
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