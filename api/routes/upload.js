const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

//set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../client/public/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  
//create the file upload function
const upload = multer({ 
    storage: storage,
    limits:{fileSize:'1000000'},
    fileFilter:(req, file, callback)=>{
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('Please upload a valid image file'));
        }
        callback(undefined, true);
    }
});

//route for posting a file to the upload function
router.post('/', upload.single('file'), async (req, res) => {
    res.json({ message: 'File uploaded successfully!' });
});

//route for deleting a file from storage with a given name
router.delete('/:name', async (req, res) => {
    filePath = "../client/public/" + req.params.name;
    fs.existsSync(filePath) ? fs.unlinkSync(filePath) : console.log('FILE NOT FOUND');
})

module.exports = router;