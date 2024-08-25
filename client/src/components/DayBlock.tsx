import '../assets/BootswatchTheme.css';
import plus from '../assets/muscle-icon.svg';
import camera from '../assets/camera.svg';
import React from 'react';
import ExerciseForm from './ExerciseForm';
import PhotoForm from './PhotoForm';
import ExButton from './ExButton';
import PhotoButton from './PhotoButton';
import { Lift, Photo } from './Types';

//object to hold events for each day on the calendar
const DayBlock = ({daynum, dateraw, content, photos, fetchData} : {daynum: number, dateraw : Date, content : Lift[], photos : Photo[], fetchData : () => void}) => {

    //forms visibility state for adding
    const [exAddOpen, setExAddOpen] = React.useState(false);
    const [phoAddOpen, setPhoAddOpen] = React.useState(false);

    //add exercise/photo form open/close methods
    const openExAdd = () => {
        setExAddOpen(true);
    }
    const closeExAdd = () => {
        setExAddOpen(false);
    }
    const openPhoAdd = () => {
        setPhoAddOpen(true);
    }
    const closePhoAdd = () => {
        setPhoAddOpen(false);
    }

    //if this is a empty space day block, return an empty div
    if(daynum < 0){
        return (
            <div className='d-inline-flex p-1 rounded-4 justify-content-center' style={{width: "120px"}}><br/></div>
        )
    }

    //if this is a valid dayblock, include the day number, an add exercise button, an add photo button, and buttons for any exercises/photos passed in
    //lastly, include the modal addition forms, but make them invisible by default
    return (
        <>

            <div className='d-inline-flex p-1 bg-primary rounded-4 justify-content-center' style={{width: "120px"}}>
                <div className='Container'>    
                                
                    <div className="row">
                        <div className='col p-1' >
                            <h5>{daynum}</h5>
                        </div>
                        <div className='col p-1'>
                            <button className="btn btn-light p-0" style={{width: "30px", height:"30px"}} onClick={openExAdd}>
                                <img className='w-75' src={plus} alt="plus"/>
                            </button>
                        </div>
                        <div className='col p-1'>
                            <button className="btn btn-light p-0" style={{width: "30px", height:"30px"}} onClick={openPhoAdd} >
                                <img className='w-75' src={camera} alt="camera"/>
                            </button>
                        </div>        
                    </div>

                    <div className='row'>
                        <div className='container'>
                            {content.map((lift:Lift) => {
                                    return (
                                        <ExButton key={lift._id} exercise={lift} fetchData={fetchData} />
                                    )
                            })}
                        </div>
                    </div>

                    <div className='row'>
                        <div className='container'>
                            {photos.map((photo:Photo) => {
                                    return (
                                        <PhotoButton key={photo._id} photo={photo} dateGiven={dateraw} fetchData={fetchData} />
                                    )
                            })}
                        </div>
                    </div>

                </div>
            </div>
            <ExerciseForm isOpen={exAddOpen} onClose={closeExAdd} dateGiven={dateraw} fetchData={fetchData} />
            <PhotoForm isOpen={phoAddOpen} onClose={closePhoAdd} dateGiven={dateraw} fetchData={fetchData}/>
        </>
    )
}

export default DayBlock;