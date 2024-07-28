const express = require('express')
const router = express.Router()
const Photo = require('../models/photo')
const monthdays = [31,28,31,30,31,30,31,31,30,31,30,31];

module.exports = router

  //read x
  router.get('/', async (req, res) => {
    try {
      const photos = await Photo.find()
      res.json(photos)
    } catch (err) {
      res.status(500).json({ message: err.message})
    }
  });

  router.post('/specific', async (req, res) => {
    try {
      var indate = new Date(req.body.pagedate);
      var startdate = new Date(indate.getFullYear(), indate.getMonth(), 1, 1,0,0)
      var lastday = monthdays[indate.getMonth()];
      if (indate.getFullYear() % 4 == 0){
        lastday = 29;
      }
      var enddate = new Date(indate.getFullYear(), indate.getMonth(), lastday+3, 1,0,0)
      const photos = await Photo.find({"date": {"$gte": startdate, "$lt": enddate}})
      res.json(photos)
    } catch (err) {
      res.status(500).json({ message: err.message})
    }
  });

  //create x
  router.post('/', async (req, res) => {
    const photo = new Photo({
      photofile: req.body.photofile,
      weight: req.body.weight,
      date: req.body.date
    })
  
    try{
      const newPhoto = await photo.save();
      res.status(201).json(newPhoto);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

    //getter middleware
    async function getPhoto(req, res, next){
        let photo
        try {
            photo = await Photo.findById(req.params.id)
            if (photo == null){
                return res.status(404).json( {message: 'Cannot find photo'})
            }
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    
        res.photo = photo
        next()
    }
    
 //update x
  router.patch('/:id', getPhoto, async (req, res) => {
    if(req.body.photofile != null){
        res.photo.photofile = req.body.photofile
    }
    if(req.body.weight != null){
        res.photo.weight = req.body.weight
    }
    try {
        const updatedPhoto = await res.photo.save()
        res.json(updatedPhoto)
    } catch (err){
        res.status(400).json({ message: err.message })
    }
  })
  
   //delete x
 router.delete('/:id', getPhoto, async (req, res) =>{
    try {
        await res.photo.deleteOne()
        res.json({ message: 'Deleted Photo'})
    } catch (err){
        res.status(500).json({ message: err.message })
    }
 })


module.exports = router