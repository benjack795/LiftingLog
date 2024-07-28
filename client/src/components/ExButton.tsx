import React from 'react';
import '../assets/BootswatchTheme.css';
import ExerciseView from './ExerciseView';

const ExButton = ({exercise, fetchData} : any) => {
    
    const [exViewOpen, setExViewOpen] = React.useState(false);

    const openExView = () => {
        setExViewOpen(true);
    }
    
    const closeExView = () => {
        setExViewOpen(false);
    }

    var stylestring = '';
    var labelstring = '';
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

      return (
        <>
             <div className='row'>
                     <button className={stylestring} onClick={openExView}>
                         <label>{labelstring}</label>
                     </button>
             </div>
             <ExerciseView isOpen={exViewOpen} onClose={closeExView} content={exercise} fetchData={fetchData}/>
        </>

     )


}

export default ExButton;