import '../assets/BootswatchTheme.css';
import plus from '../assets/plus-lg.svg';
import camera from '../assets/camera.svg';
import React from 'react';
import ExerciseForm from './ExerciseForm';
import PhotoForm from './PhotoForm';

const DayBlock = ({daynum} : {daynum: number}) => {

    const butsize = '50px';
    const [exAddOpen, setExAddOpen] = React.useState(false);
    const [exPhoOpen, setPhoAddOpen] = React.useState(false);

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


    return (
        <>
            <div className='d-inline-flex p-1 bg-primary rounded-4 justify-content-center' style={{width: "120px", height: "165px"}}>
                <div className='Container'>
                    
                    <div className="row">
                        <div className='col p-1' >
                            <h5>{daynum}</h5>
                        </div>
                        <div className='col p-1' >
                            <button className="btn btn-light p-0 w-100" style={{width: "30px", height:"30px"}} onClick={openExAdd}>
                                <img className='w-75' src={plus}/>
                            </button>
                            <ExerciseForm isOpen={exAddOpen} onClose={closeExAdd} />
                        </div>
                        <div className='col p-1'>
                            <button className="btn btn-light p-0" style={{width: "30px", height:"30px"}} onClick={openPhoAdd} >
                                <img className='w-75' src={camera}/>
                            </button>
                            <PhotoForm isOpen={exPhoOpen} onClose={closePhoAdd} />
                        </div>        
                    </div>

                    <div className="row">
                        <div className='container'>
                            <div className='row'>
                                <div className='col p-1'>
                                    <button className='btn p-2 rounded-5 bg-success text-center' style={{width: butsize, height: butsize}}><h3>S</h3></button>
                                </div> 
                                <div className='col p-1'>
                                    <button className='btn p-2 rounded-5 bg-info text-center' style={{width: butsize, height: butsize}}><h3>B</h3></button>
                                </div>       
                            </div>  
                            <div className='row'>
                                <div className='col p-1'>    
                                    <button className='btn p-2 rounded-5 bg-danger text-center' style={{width: butsize, height: butsize}}><h3>D</h3></button>
                                </div>
                                <div className='col p-1'>
                                    <button className='btn p-2 rounded-5 bg-warning text-center' style={{width: butsize, height: butsize}}><h3>P</h3></button>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default DayBlock;