import { Button, Form, Modal, Row } from 'react-bootstrap';
import '../assets/BootswatchTheme.css';
import { useState } from 'react';
import { Photo } from './Types';

//a modal form object, displayed when a photo button is clicked, allowing a photo to be deleted
const PhotoForm = ({isOpen, onClose, content, dateGiven, fetchData} : {isOpen : boolean, onClose : ()=>void, content : Photo,  dateGiven: Date, fetchData: () => void }) => {

    //button state 1-close/delete 2-sure/not sure
    const [buttonState, setButtonState] = useState(1);

    //produce a dated file name to delete file as it was stored initially
    const getFileName = () => {
        return (dateGiven.getDate() + '-' + (dateGiven.getMonth()+1) + '-' + dateGiven.getFullYear() + '-' + content.photofile);
    };

    //button state change functions
    const goToOriginalState = () => {
        setButtonState(1);
    };

    const goToDeleteState = () => {
        setButtonState(2);
    };

    //deletion handling
    const handleDelete = () => {
        //delete photo from local storage
        fetch('http://localhost:5000/upload/' + getFileName(), { 
            headers: {
                "Content-Type": "application/json",
            },
            method: "DELETE"
        }).then(() => {
            closeForm();
        });     
        
        //delete photo data from backend
        fetch('http://localhost:5000/photos/' + content._id, { 
            headers: {
                "Content-Type": "application/json",
            },
            method: "DELETE"
        }).then(() => {
            closeForm();
        });
        
    }

    //reset form on close
    const closeForm = () =>{
        onClose();
        setButtonState(1);
        fetchData();
    };

    //change title based on button state
    const switchHeaders = (statenum: number) =>{
        switch(statenum){
            case 1:
                return(
                    <Modal.Title>View Progress Photo</Modal.Title>
                )
            case 2:
                return(
                    <Modal.Title>Delete Progress Photo</Modal.Title>
                )
        };
    };

    //return buttons depending on button state
    const switchButtons = () => {
        switch(buttonState){
            case 1:
                return (
                    <Modal.Footer>
                        <Button role="delbut" variant="danger" onClick={goToDeleteState}>
                            Delete
                        </Button>
                    </Modal.Footer>
                )
            case 2:
                return (
                    <Modal.Footer>
                        <p>ARE YOU SURE?</p>
                        <Button variant="info" onClick={goToOriginalState}>
                            Cancel
                        </Button>
                        <Button role="surebut" variant="danger" onClick={handleDelete}>
                            Yes
                        </Button>
                    </Modal.Footer>
                )
        };
    };

    //return nothing if the form isnt open/visible
    if (!isOpen) return null;

    //return the form, which has:
    //title
    //photo displayed in box
    //buttons depending on state
    return (
       <>
            <Modal show={isOpen} onHide={closeForm}>
                <Modal.Header closeButton>
                    {switchHeaders(buttonState)}
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate encType='multipart/form-data'>
                        <Row className="mb-2">
                            <Form.Group>
                                <Form.Label>Photo Preview</Form.Label>
                                <div className="bg-primary text-center rounded-3">
                                    <img role="formimg" alt="viewimg" className="w-100 p-2"src={getFileName()}/>
                                </div>
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                {switchButtons()}
            </Modal>
      </>
    )
}

export default PhotoForm;