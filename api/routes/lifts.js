const express = require('express')
const router = express.Router()
const Lift = require('../models/lift')

  //read x
  router.get('/', async (req, res) => {
    try {
      const lifts = await Lift.find()
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