import '../assets/BootswatchTheme.css';
import plus from '../assets/plus-lg.svg';
import camera from '../assets/camera.svg';
import React, { useEffect, useState } from 'react';
import ExerciseForm from './ExerciseForm';
import PhotoForm from './PhotoForm';
import ExerciseView from './ExerciseView';
import PhotoView from './PhotoView';
import ExButton from './ExButton';
import PhotoButton from './PhotoButton';

const DayBlock = ({daynum, content, photos} : {daynum: any, content : any, photos : any}) => {

    const [exAddOpen, setExAddOpen] = React.useState(false);
    const [phoAddOpen, setPhoAddOpen] = React.useState(false);
    const [exViewOpen, setExViewOpen] = React.useState(false);
    const [phoViewOpen, setPhoViewOpen] = React.useState(false);

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

    const openExView = () => {
        setExViewOpen(true);
    }
    
    const closeExView = () => {
        setExViewOpen(false);
    }

    const openPhoView = () => {
        setPhoViewOpen(true);
    }
    
    const closePhoView = () => {
        setPhoViewOpen(false);
    }

    if(daynum === 'F'){
        return (
            <div className='d-inline-flex p-1 rounded-4 justify-content-center' style={{width: "130px", height: "180px"}}><br/></div>
        )
    }


    return (
        <>

            <div className='d-inline-flex p-1 bg-primary rounded-4 justify-content-center' style={{width: "130px", height: "180px"}}>
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
                                        <ExButton exercise={lift} />
                                    )
                            })}
                        </div>
                    </div>

                    <div className='row'>
                        <div className='container'>
                            {photos.map((photo:any) => {
                                    return (
                                        <PhotoButton/>
                                    )
                            })}
                        </div>
                    </div>

                </div>
            </div>
            <ExerciseForm isOpen={exAddOpen} onClose={closeExAdd} />
            <PhotoForm isOpen={phoAddOpen} onClose={closePhoAdd} />
            <ExerciseView isOpen={exViewOpen} onClose={closeExView}/>
            <PhotoView isOpen={phoViewOpen} onClose={closePhoView}/>
        </>
    )
}

export default DayBlock;