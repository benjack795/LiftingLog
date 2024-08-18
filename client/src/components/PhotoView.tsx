import { Button, Form, Modal, Row } from 'react-bootstrap';
import '../assets/BootswatchTheme.css';
import { useState } from 'react';

const PhotoForm = ({isOpen, onClose, content, dateGiven, fetchData} : {isOpen : boolean, onClose : ()=>void, content : any,  dateGiven: Date, fetchData: () => void }) => {

    const [buttonState, setButtonState] = useState(1);

    const getFileName = () => {
        return (dateGiven.getDate() + '-' + (dateGiven.getMonth()+1) + '-' + dateGiven.getFullYear() + '-' + content.photofile)
    }


    const goToOriginalState = () => {
        setButtonState(1)
    }

    const goToDeleteState = () => {
        setButtonState(2)
    }

    const handleDelete = () => {
        //delete photo
        console.log('http://localhost:5000/upload/' + getFileName())
        fetch('http://localhost:5000/upload/' + getFileName(), { 
            headers: {
                "Content-Type": "application/json",
            },
            method: "DELETE"
        }).then(() => {
            closeForm();
        });     
        
        //delete db
        fetch('http://localhost:5000/photos/' + content._id, { 
            headers: {
                "Content-Type": "application/json",
            },
            method: "DELETE"
        }).then(() => {
            closeForm();
        });
        
    }

    const closeForm = () =>{
        onClose();
        setButtonState(1);
        fetchData();
    }

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
        }
    }

    const switchButtons = () => {
        switch(buttonState){
            case 1:
                return (
                    <Modal.Footer>
                        <Button variant="danger" onClick={goToDeleteState}>
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
                        <Button variant="danger" onClick={handleDelete}>
                            Yes
                        </Button>
                    </Modal.Footer>
                )
        }
    }

    if (!isOpen) return null;

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
                                    <img alt="viewimg" className="w-100 p-2"src={getFileName()}/>
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