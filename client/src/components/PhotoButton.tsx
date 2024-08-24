import React from 'react';
import '../assets/BootswatchTheme.css';
import PhotoView from './PhotoView';
import {Photo} from './Types';

//clickable button object added to dayblock for each photo in a day, with an editing modal form
const PhotoButton = ({photo, dateGiven, fetchData} : {photo : Photo, dateGiven : Date, fetchData : () => void}) => {

        //form visibility state and setters
        const [phoViewOpen, setPhoViewOpen] = React.useState(false);
        const openPhoView = () => {
                setPhoViewOpen(true);
        };
        const closePhoView = () => {
                setPhoViewOpen(false);
        };

    //return a clickable yellow photo button that opens an editing form
    return (
                <>
                        <div className='row'>
                                <button name="Photo" className='btn rounded-3 bg-warning text-black btn-sm' onClick={openPhoView}>
                                <label>Photo</label>
                                </button>
                        </div>
                        <PhotoView isOpen={phoViewOpen} onClose={closePhoView} content={photo} dateGiven={dateGiven} fetchData={fetchData}/>                
                </>

        )


}

export default PhotoButton;