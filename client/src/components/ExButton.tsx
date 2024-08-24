import React from 'react';
import '../assets/BootswatchTheme.css';
import ExerciseView from './ExerciseView';
import {Lift} from './Types';

//button object added to a dayblock for each exercise on a given day, clickable to edit
const ExButton = ({exercise, fetchData} : {exercise : Lift, fetchData : () => void}) => {
    
    //view form visibility state and setters
    const [exViewOpen, setExViewOpen] = React.useState(false);
    const openExView = () => {
        setExViewOpen(true);
    }  
    const closeExView = () => {
        setExViewOpen(false);
    }

    //define color and style based on exercise
    let stylestring = '';
    let labelstring = '';
    switch(exercise.extype) {
        case 1:
            stylestring='btn rounded-3 bg-success text-black btn-sm';
            labelstring='Squat';
            break;
        case 2:
            stylestring='btn rounded-3 bg-info text-black btn-sm';
            labelstring='Benchpress';
            break;
        case 3:
            stylestring='btn rounded-3 bg-danger text-black btn-sm';
            labelstring='Deadlift';
            break;
      }

      //return a clickable button and an invisible modal form to edit the exercise with
      return (
        <>
             <div className='row'>
                     <button name={labelstring} className={stylestring} onClick={openExView}>
                         <label>{labelstring}</label>
                     </button>
             </div>
             <ExerciseView isOpen={exViewOpen} onClose={closeExView} content={exercise} fetchData={fetchData}/>
        </>

     )


}

export default ExButton;