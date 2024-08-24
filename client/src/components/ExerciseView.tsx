import { Button, Form, Modal, Row } from 'react-bootstrap';
import '../assets/BootswatchTheme.css';
import { useState } from 'react';
import { Lift } from './Types';

//a modal form object, which allows users to edit and delete exercise objects when clicked
const ExerciseView = ({isOpen, onClose, content, fetchData} : {isOpen : boolean, onClose : ()=>void, content: Lift, fetchData: () => void }) => {

    //button states - 1 edit/delete, 2 not sure/sure, 3 back/save edit
    const [buttonState, setButtonState] = useState(1);
    //states 1 and 2 are read only
    const [readOnlyForm, setReadOnlyForm] = useState(true);
    //form data state, form data change handlers
    const[formData, setFormData] = useState({
        extype: content.extype,
        weight: content.weight,
        sets: content.sets,
        reps: content.reps
    });
    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
                ...formData,
                [name]:value,
        });
    };

    //state transition methods
    const goToOriginalState = () => {
        setReadOnlyForm(true);
        setButtonState(1);
    };
    const goToDeleteState = () => {
        setReadOnlyForm(true);
        setButtonState(2);
    };
    const goToEditState = () => {
        setReadOnlyForm(false);
        setButtonState(3);
    };

    //form reset
    const resetFormData = () => {
        setFormData({
            extype: content.extype,
            weight: content.weight,
            sets: content.sets,
            reps: content.reps
        });
    };

    //on delete, send a request to delete the form data from the backend
    const handleDelete = () => {
        //delete request
        fetch('http://localhost:5000/lifts/' + content._id, { 
            headers: {
                "Content-Type": "application/json",
            },
            method: "DELETE"
        }).then(() => {
            closeForm();
        });
    };

    //on edit, send request to update the form data in the backend
    const handleUpdate = () => {
        //update request
        fetch('http://localhost:5000/lifts/' + content._id, { 
            headers: {
                "Content-Type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify({
                extype: formData.extype,
                weight: formData.weight,
                sets: formData.sets,
                reps: formData.reps
            })
        }).then(() => {
            closeForm();
            setFormData({
                extype: formData.extype,
                weight: formData.weight,
                sets: formData.sets,
                reps: formData.reps
            });
        });
    };

    //reset data on form close
    const closeForm = () =>{
        resetFormData();
        fetchData();
        onClose();
        setReadOnlyForm(true)
        setButtonState(1);
    };

    //change the title depending on the button state
    const switchHeaders = (statenum: number) =>{
        switch(statenum){
            case 1:
                return(
                    <Modal.Title>View Exercise</Modal.Title>
                )
            case 2:
                return(
                    <Modal.Title>Delete Exercise</Modal.Title>
                )
            case 3:
                return(
                    <Modal.Title>Edit Exercise</Modal.Title>
                )
        }
    };

    //return the buttons depending on the button state
    const switchButtons = (statenum : number) => {
        switch(statenum){
            case 1:
                return (
                    <Modal.Footer>
                        <Button role="editbut" variant="warning" onClick={goToEditState}>
                            Edit
                        </Button>
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
            case 3:
                return (
                    <Modal.Footer>
                        <Button role="savbut" variant="warning" onClick={handleUpdate}>
                            Save
                        </Button>
                        <Button variant="info" onClick={goToOriginalState}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                )
        }
    };

    //return nothing if the form isnt open/visible
    if (!isOpen) return null;

    //return the form, which contains:
    //title depending on the state
    //exercise fields, matching the add
    //buttons depending on the state
    return (
       <>
            <Modal show={isOpen} onHide={closeForm}>
                <Modal.Header closeButton>
                    {switchHeaders(buttonState)}
                </Modal.Header>
                <Modal.Body>
                <Form noValidate>
                        <Row className="mb-2">
                            <Form.Group>
                                <Form.Label>Exercise Type</Form.Label>
                                <Form.Select aria-label="Default select" disabled={readOnlyForm} name="extype" value={formData.extype} onChange={handleChange}>
                                    <option value="1">Squat</option>
                                    <option value="2">Benchpress</option>
                                    <option value="3">Deadlift</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-2">
                            <Form.Group>
                                <Form.Label>Weight Lifted (KG)</Form.Label>
                                <Form.Control placeholder="Enter weight" readOnly={readOnlyForm} name="weight" value={formData.weight} onChange={handleChange} type="number" min="0" required/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-2">
                            <Form.Group>
                                <Form.Label>Sets</Form.Label>
                                <Form.Control placeholder="Enter sets" readOnly={readOnlyForm} name="sets" value={formData.sets} onChange={handleChange} type="number" min="0" required/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-2">
                            <Form.Group>
                                <Form.Label>Reps</Form.Label>
                                <Form.Control placeholder="Enter reps" readOnly={readOnlyForm} name="reps" value={formData.reps} onChange={handleChange} type="number" min="0" required/>
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                {switchButtons(buttonState)}

            </Modal>
      </>
    )
}

export default ExerciseView;