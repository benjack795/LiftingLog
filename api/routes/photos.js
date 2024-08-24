const express = require('express');
const router = express.Router();
const Photo = require('../models/photo');
const monthdays = [31,28,31,30,31,30,31,31,30,31,30,31];
module.exports = router;

  //routes for the photos api

  //fetch all photo objects
  router.get('/', async (req, res) => {
    try {
      const photos = await Photo.find();
      res.json(photos);
    } catch (err) {
      res.status(500).json({ message: err.message});
    }
  });

  //fetch all photo objects between the start and end of the month of a given date
  router.post('/specific', async (req, res) => {
    try {
      let indate = new Date(req.body.pagedate);
      let startdate = new Date(indate.getFullYear(), indate.getMonth(), 1, 1,0,0);
      let lastday = monthdays[indate.getMonth()];
      if (indate.getFullYear() % 4 == 0){
        lastday = 29;
      }
      let enddate = new Date(indate.getFullYear(), indate.getMonth(), lastday+3, 1,0,0);
      const photos = await Photo.find({"date": {"$gte": startdate, "$lt": enddate}});
      res.json(photos);
    } catch (err) {
      res.status(500).json({ message: err.message});
    }
  });

  //create new photo object
  router.post('/', async (req, res) => {
    const photo = new Photo({
      photofile: req.body.photofile,
      date: req.body.date
    });
  
    try{
      const newPhoto = await photo.save();
      res.status(201).json(newPhoto);
    } catch (err) {
      console.log(req.body);
      res.status(400).json({ message: err.message });
    }
  });

  //getter middleware function
  async function getPhoto(req, res, next){
      let photo;
      try {
          photo = await Photo.findById(req.params.id);
          if (photo == null){
              return res.status(404).json( {message: 'Cannot find photo'});
          }
      } catch (err) {
          return res.status(500).json({ message: err.message });
      }
  
      res.photo = photo;
      next();
  }
    
 //delete photo object with getter middleware function
 router.delete('/:id', getPhoto, async (req, res) =>{
    try {
        await res.photo.deleteOne();
        res.json({ message: 'Deleted Photo'});
    } catch (err){
        res.status(500).json({ message: err.message });
    }
 })


module.exports = router;