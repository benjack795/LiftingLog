import { Button, Form, Modal, Row } from 'react-bootstrap';
import '../assets/BootswatchTheme.css';
import { useState } from 'react';
import placeholder from '../assets/image-fill.svg';

const allowedTypes = ['image/png','image/jpg','image/jpeg'];

const PhotoForm = ({isOpen, onClose, dateGiven, fetchData} : {isOpen : boolean, onClose : ()=>void, dateGiven: Date, fetchData : () => void}) => {

    const[formData, setFormData] = useState({
        photofile: 'no file',
        weight: 0,
    });
    const [formFile, setFormFile] = useState<File>();
    const [fileTypeError, setFileTypeError] = useState(false);


    const getFileName = () => {
        return (dateGiven.getDate() + '-' + (dateGiven.getMonth()+1) + '-' + dateGiven.getFullYear() + '-' + formFile!.name)
    }

    const handleChange = (e : any) => {
        const { name, value } = e.target;
        setFormData({
                ...formData,
                [name]:value,
        });
    };

    const handleChangeFile = (e : any) => {
        setFileTypeError(false)
        setFormFile(e.target.files[0]);
    };

    const resetFormData = () => {
        setFormData({
            photofile: 'no file',
            weight: 0,
        })
    }

    const resetFormFile = () => {
        setFormFile(undefined)
    }

    const handleSubmit = (e : any) => {
        e.preventDefault();

        //upload file to host
        const formDataObj = new FormData()      

        if(formFile != undefined){
            if(formFile.name.match(/\.(jpg|jpeg|png)$/)){
                console.log(formFile.type)
                const uploadPhoto = new File([formFile!], getFileName(), {type: formFile!.type})
                setFileTypeError(false)
                formDataObj.append('file', uploadPhoto)
                fetch('http://localhost:5000/upload/', { 
                    method: "POST", 
                    body: formDataObj
                }).then(()=>{
                    closeForm()
                });
                
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
                    closeForm()
                });      

                
            } else {
                setFileTypeError(true)
            }
        } else {
            setFileTypeError(true)
        }
        

   

    };

    const closeForm = () =>{
        onClose();
        resetFormData();
        resetFormFile();
        setFileTypeError(false);
        fetchData();
    }


    if (!isOpen) return null;

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
                                    {formFile ? <img src={URL.createObjectURL(formFile)} className='w-100 p-2'/> : <img src={placeholder} className='w-75'/>}
                                </div>
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {/* <p>{JSON.stringify(formData)}</p> */}
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
      </>
    )
}

export default PhotoForm;