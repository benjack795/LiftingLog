import { Button, Form, Modal } from 'react-bootstrap';
import '../assets/BootswatchTheme.css';

const PhotoForm = ({isOpen, onClose} : any) => {
    if (!isOpen) return null;

    return (
       <>
            <Modal show={isOpen} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Progress Photo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='Container'>
                        <div className="row">
                        <Form.Group className="mb-3">
                            <Form.Label>Upload Photo</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <Form.Label>Photo Preview</Form.Label>
                                <div className="bg-primary text-center rounded-3">
                                    PREVIEW
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <Form.Group className="mb-3">
                                <Form.Label>Body Weight (KG)</Form.Label>
                                <Form.Control placeholder="Enter body weight" />
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

export default PhotoForm;