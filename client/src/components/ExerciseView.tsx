import { Button, Form, Modal, Row } from 'react-bootstrap';
import '../assets/BootswatchTheme.css';
import { useState } from 'react';

const ExerciseView = ({isOpen, onClose, content, fetchData} : {isOpen : boolean, onClose : ()=>void, content: any, fetchData: () => void }) => {

    const [buttonState, setButtonState] = useState(1);
    const [readOnlyForm, setReadOnlyForm] = useState(true);

    const[formData, setFormData] = useState({
        extype: content.extype,
        weight: content.weight,
        sets: content.sets,
        reps: content.reps
    });

    const handleChange = (e : any) => {
        const { name, value } = e.target;
        setFormData({
                ...formData,
                [name]:value,
        });
    };

    const goToOriginalState = () => {
        setReadOnlyForm(true)
        setButtonState(1)
    }

    const goToDeleteState = () => {
        setReadOnlyForm(true)
        setButtonState(2)
    }

    const goToEditState = () => {
        setReadOnlyForm(false)
        setButtonState(3)
    }

    const resetFormData = () => {
        setFormData({
            extype: content.extype,
            weight: content.weight,
            sets: content.sets,
            reps: content.reps
        })
    }

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
    }

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
            })
        });
    }

    const closeForm = () =>{
        resetFormData();
        fetchData();
        onClose();
        setReadOnlyForm(true)
        setButtonState(1);
    }

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
    }

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
    }


    if (!isOpen) return null;

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
                {/* <p>{JSON.stringify(formData)}</p> */}
                {switchButtons(buttonState)}

            </Modal>
      </>
    )
}

export default ExerciseView;