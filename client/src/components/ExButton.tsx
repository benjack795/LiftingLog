import '../assets/BootswatchTheme.css';

const ExButton = ({exercise} : {exercise : any}) => {

    var stylestring = '';
    var labelstring = '';
    switch(exercise.extype) {
        case 'squat':
            stylestring='btn rounded-3 bg-success text-black btn-sm';
            labelstring='Squat';
            break;
        case 'bench':
            stylestring='btn rounded-3 bg-info text-black btn-sm';
            labelstring='Benchpress';
            break;
        case 'deadlift':
            stylestring='btn rounded-3 bg-danger text-black btn-sm';
            labelstring='Deadlift';
            break;
      }

      return (
             <div className='row'>
                     <button className={stylestring}>
                         <label>{labelstring}</label>
                     </button>
             </div>
     )


}

export default ExButton;