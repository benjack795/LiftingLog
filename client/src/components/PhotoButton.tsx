import React from 'react';
import '../assets/BootswatchTheme.css';
import PhotoView from './PhotoView';

const PhotoButton = () => {

        const [phoViewOpen, setPhoViewOpen] = React.useState(false);
        
        const openPhoView = () => {
                setPhoViewOpen(true);
        }
            
        const closePhoView = () => {
                setPhoViewOpen(false);
        }

    return (
                <>
                        <div className='row'>
                                <button className='btn rounded-3 bg-warning text-black btn-sm' onClick={openPhoView}>
                                <label>Photo</label>
                                </button>
                        </div>
                        <PhotoView isOpen={phoViewOpen} onClose={closePhoView}/>                
                </>

        )


}

export default PhotoButton;