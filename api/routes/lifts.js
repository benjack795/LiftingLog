const express = require('express')
const router = express.Router()
const Lift = require('../models/lift')
const monthdays = [31,28,31,30,31,30,31,31,30,31,30,31];

  //read x
  router.get('/', async (req, res) => {
    try {
      const lifts = await Lift.find()
      res.json(lifts)
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
      var enddate = new Date(indate.getFullYear(), indate.getMonth(), lastday+3,1,0,0)
      const lifts = await Lift.find({"date": {"$gte": startdate, "$lt": enddate}})
      res.json(lifts)
    } catch (err) {
      res.status(500).json({ message: err.message})
    }
  });

  //create x
  router.post('/', async (req, res) => {
    const lift = new Lift({
      extype: req.body.extype,
      weight: req.body.weight,
      sets: req.body.sets,
      reps: req.body.reps,
      date: req.body.date
    })
  
    try{
      const newLift = await lift.save();
      res.status(201).json(newLift);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //getter middleware
  async function getLift(req, res, next){
    let lift
    try {
        lift = await Lift.findById(req.params.id)
        if (lift == null){
            return res.status(404).json( {message: 'Cannot find lift'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.lift = lift
    next()
  }

 //update x
  router.patch('/:id', getLift, async (req, res) => {
    console.log(req.body)
    if(req.body.extype != null){
        res.lift.extype = req.body.extype
    }
    if(req.body.weight != null){
        res.lift.weight = req.body.weight
    }
    if(req.body.sets != null){
        res.lift.sets = req.body.sets
    }
    if(req.body.reps != null){
        res.lift.reps = req.body.reps
    }
    try {
        const updatedLift = await res.lift.save()
        res.json(updatedLift)
    } catch (err){
        res.status(400).json({ message: err.message })
    }
  })
  

 //delete x
 router.delete('/:id', getLift, async (req, res) =>{
    try {
        await res.lift.deleteOne()
        res.json({ message: 'Deleted Lift'})
    } catch (err){
        res.status(500).json({ message: err.message })
    }
 })


module.exports = router