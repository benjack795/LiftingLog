import { Button, Form, Modal } from 'react-bootstrap';
import '../assets/BootswatchTheme.css';


const ExerciseForm = ({isOpen, onClose} : any) => {
    if (!isOpen) return null;

    return (
       <>
            <Modal show={isOpen} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Exercise</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='Container'>
                        <div className="row">
                            <Form.Group className="mb-3">
                                <Form.Label>Exercise Type</Form.Label>
                                <Form.Select aria-label="Default select">
                                    <option value="1">Squat</option>
                                    <option value="2">Bench</option>
                                    <option value="3">Deadlift</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className="row">
                            <Form.Group className="mb-3">
                                <Form.Label>Weight Lifted (KG)</Form.Label>
                                <Form.Control placeholder="Enter weight" />
                            </Form.Group>
                        </div>
                        <div className="row">
                            <Form.Group className="mb-3">
                                <Form.Label>Sets</Form.Label>
                                <Form.Control placeholder="Enter sets" />
                            </Form.Group>
                        </div>
                        <div className="row">
                            <Form.Group className="mb-3">
                                <Form.Label>Reps</Form.Label>
                                <Form.Control placeholder="Enter reps" />
                            </Form.Group>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary">
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
      </>
    )
}

export default ExerciseForm;