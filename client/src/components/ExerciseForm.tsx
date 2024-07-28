import { Button, Form, Modal, Row } from 'react-bootstrap';
import '../assets/BootswatchTheme.css';
import { useState } from 'react';


const ExerciseForm = ({isOpen, onClose, dateGiven, fetchData} : {isOpen : boolean, onClose : ()=>void, dateGiven: Date, fetchData : () => void}) => {

    const[formData, setFormData] = useState({
        extype: 1,
        weight: 0,
        sets: 0,
        reps: 0
    });

    const handleChange = (e : any) => {
        const { name, value } = e.target;
        setFormData({
                ...formData,
                [name]:value,
        });
    };

    const resetFormData = () => {
        setFormData({
            extype: 1,
            weight: 0,
            sets: 0,
            reps: 0
        })
    }

    const handleSubmit = (e : any) => {
        e.preventDefault();

        fetch('http://localhost:5000/lifts/', { 
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST", 
            body: JSON.stringify({ 
                extype: formData.extype,
                weight: formData.weight,
                sets: formData.sets,
                reps: formData.reps,
                date : dateGiven
            })
        }).then(()=>{
            closeForm()
        });      

    };

    const closeForm = () =>{
        onClose();
        resetFormData();
        fetchData();
    }

    if (!isOpen) return null;

    return (
       <>
            <Modal show={isOpen} onHide={closeForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Exercise</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate>
                        <Row className="mb-2">
                            <Form.Group>
                                    <Form.Label>Exercise Type</Form.Label>
                                    <Form.Select aria-label="default select" name="extype" value={formData.extype} onChange={handleChange}>
                                        <option value="1">Squat</option>
                                        <option value="2">Benchpress</option>
                                        <option value="3">Deadlift</option>
                                    </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-2">
                                <Form.Group>
                                    <Form.Label>Weight Lifted (KG)</Form.Label>
                                    <Form.Control placeholder="Enter weight" name="weight" value={formData.weight} onChange={handleChange} type="number" min="0" required/>
                                </Form.Group>
                        </Row>
                        <Row className="mb-2">
                                <Form.Group>
                                    <Form.Label>Sets</Form.Label>
                                    <Form.Control placeholder="Enter sets" name="sets" value={formData.sets} onChange={handleChange} type="number" min="0" required/>
                                </Form.Group>
                        </Row>
                        <Row className="mb-2">
                                <Form.Group>
                                    <Form.Label>Reps</Form.Label>
                                    <Form.Control placeholder="Enter reps" name="reps" value={formData.reps} onChange={handleChange} type="number" min="0" required/>
                                </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <p>{dateGiven.toDateString()}</p>
                <p>{JSON.stringify(formData)}</p>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
      </>
    )
}

export default ExerciseForm;