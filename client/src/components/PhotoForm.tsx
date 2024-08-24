import { Button, Form, Modal, Row } from 'react-bootstrap';
import '../assets/BootswatchTheme.css';
import { useState } from 'react';
import placeholder from '../assets/image-fill.svg';

//modal form object, designed to simultaneously send photo data (name, date) to the api and upload photo itself to file storage
const PhotoForm = ({isOpen, onClose, dateGiven, fetchData} : {isOpen : boolean, onClose : ()=>void, dateGiven: Date, fetchData : () => void}) => {

    //states for form data, form file and whether or not there is a file error
    const[, setFormData] = useState({
        photofile: 'no file',
        weight: 0,
    });
    const [formFile, setFormFile] = useState<File>();
    const [fileTypeError, setFileTypeError] = useState(false);

    //add the date to the photo name before uploading
    const getFileName = () => {
        return (dateGiven.getDate() + '-' + (dateGiven.getMonth()+1) + '-' + dateGiven.getFullYear() + '-' + formFile!.name);
    };

    //methods for handling form change and clearing form data and file data
    const handleChangeFile = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return;
        setFileTypeError(false);
        setFormFile(e.target.files[0]);
    };

    const resetFormData = () => {
        setFormData({
            photofile: 'no file',
            weight: 0,
        });
    };

    const resetFormFile = () => {
        setFormFile(undefined);
    };

    //when the save/submit button is clicked:
    const handleSubmit = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const formDataObj = new FormData();

        if(formFile !== undefined){
            //if the file is the right type, add a date to its name and upload it
            if(formFile.name.match(/\.(jpg|jpeg|png)$/)){
                const uploadPhoto = new File([formFile!], getFileName(), {type: formFile!.type});
                setFileTypeError(false);
                formDataObj.append('file', uploadPhoto);
                fetch('http://localhost:5000/upload/', { 
                    method: "POST", 
                    body: formDataObj
                }).then(()=>{
                    closeForm()
                });
                
                //also upload its data to the photo objects api
                fetch('http://localhost:5000/photos/', { 
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST", 
                    body: JSON.stringify({ 
                        photofile: formFile.name,
                        date : dateGiven
                    })
                }).then(()=>{
                    closeForm();
                });      

                
            } else {
                setFileTypeError(true);
            }
        } else {
            setFileTypeError(true);
        }
    };

    //reset form on close
    const closeForm = () =>{
        onClose();
        resetFormData();
        resetFormFile();
        setFileTypeError(false);
        fetchData();
    };

    //return nothing if form is invisible
    if (!isOpen) return null;

    //return a modal form, with:
    //a title
    //a file uploader
    //an error message if the file chosen is not in the allowed types
    //a preview of the file when uploaded
    //a save/submit button
    return (
       <>
            <Modal show={isOpen} onHide={closeForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Progress Photo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate encType='multipart/form-data'>
                        <Row className="mb-2">
                            <Form.Group>
                                <Form.Label>Upload Photo</Form.Label>
                                <Form.Control name="file" onChange={handleChangeFile} type="file" required/>
                                {fileTypeError ? <div className='text-danger'>Please use an image of either type jpg, jpeg or png.</div> : null}
                            </Form.Group>
                        </Row>
                        <Row className="mb-2">
                            <Form.Group>
                                <Form.Label>Photo Preview</Form.Label>
                                <div className="bg-primary text-center rounded-3">
                                    {formFile ? <img src={URL.createObjectURL(formFile)} alt="submittedimg" className='w-100 p-2'/> : <img src={placeholder}  alt="placeholder" className='w-75'/>}
                                </div>
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button role="savbut" variant="primary" type="submit" onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
      </>
    )
}

export default PhotoForm;