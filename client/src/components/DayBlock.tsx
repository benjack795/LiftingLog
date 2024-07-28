import '../assets/BootswatchTheme.css';
import plus from '../assets/plus-lg.svg';
import camera from '../assets/camera.svg';
import React from 'react';
import ExerciseForm from './ExerciseForm';
import PhotoForm from './PhotoForm';
import ExButton from './ExButton';
import PhotoButton from './PhotoButton';


const DayBlock = ({daynum, dateraw, content, photos, fetchData} : {daynum: number, dateraw : Date, content : any, photos : any, fetchData : () => void}) => {

    const [exAddOpen, setExAddOpen] = React.useState(false);
    const [phoAddOpen, setPhoAddOpen] = React.useState(false);

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

    if(daynum < 0){
        return (
            <div className='d-inline-flex p-1 rounded-4 justify-content-center' style={{width: "120px"}}><br/></div>
        )
    }

    return (
        <>

            <div className='d-inline-flex p-1 bg-primary rounded-4 justify-content-center' style={{width: "120px"}}>
                <div className='Container'>    
                                
                    <div className="row">
                        <div className='col p-1' >
                            <h5>{daynum}</h5>
                        </div>
                        <div className='col p-1' >
                            <button className="btn btn-light p-0" style={{width: "30px", height:"30px"}} onClick={openExAdd}>
                                <img className='w-75' src={plus}/>
                            </button>
                        </div>
                        <div className='col p-1'>
                            <button className="btn btn-light p-0" style={{width: "30px", height:"30px"}} onClick={openPhoAdd} >
                                <img className='w-75' src={camera}/>
                            </button>

                        </div>        
                    </div>

                    <div className='row'>
                        <div className='container'>
                            {content.map((lift:any) => {
                                    return (
                                        <ExButton key={lift._id} exercise={lift} fetchData={fetchData} />
                                    )
                            })}
                        </div>
                    </div>

                    <div className='row'>
                        <div className='container'>
                            {photos.map((photo:any) => {
                                    return (
                                        <PhotoButton key={photo._id} />
                                    )
                            })}
                        </div>
                    </div>

                </div>
            </div>
            <ExerciseForm isOpen={exAddOpen} onClose={closeExAdd} dateGiven={dateraw} fetchData={fetchData} />
            <PhotoForm isOpen={phoAddOpen} onClose={closePhoAdd} />
        </>
    )
}

export default DayBlock;