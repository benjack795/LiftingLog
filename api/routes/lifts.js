const express = require('express');
const router = express.Router();
const Lift = require('../models/lift');
const monthdays = [31,28,31,30,31,30,31,31,30,31,30,31];

//routes for lifts api

  //return all lifts
  router.get('/', async (req, res) => {
    try {
      const lifts = await Lift.find();
      res.json(lifts);
    } catch (err) {
      res.status(500).json({ message: err.message});
    }
  });

  //return all lifts betweent the start and end of a month of a given date
  router.post('/specific', async (req, res) => {
    try {
      let indate = new Date(req.body.pagedate);
      let startdate = new Date(indate.getFullYear(), indate.getMonth(), 1, 1,0,0);
      let lastday = monthdays[indate.getMonth()];
      if (indate.getFullYear() % 4 == 0){
        lastday = 29;
      }
      let enddate = new Date(indate.getFullYear(), indate.getMonth(), lastday+3,1,0,0);
      const lifts = await Lift.find({"date": {"$gte": startdate, "$lt": enddate}});
      res.json(lifts);
    } catch (err) {
      res.status(500).json({ message: err.message});
    }
  });

  //create a new lift
  router.post('/', async (req, res) => {
    const lift = new Lift({
      extype: req.body.extype,
      weight: req.body.weight,
      sets: req.body.sets,
      reps: req.body.reps,
      date: req.body.date
    });
  
    try{
      const newLift = await lift.save();
      res.status(201).json(newLift);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //getter middleware function
  async function getLift(req, res, next){
    let lift
    try {
        lift = await Lift.findById(req.params.id);
        if (lift == null){
            return res.status(404).json( {message: 'Cannot find lift'});
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.lift = lift;
    next();
  }

 //update a lift via the getter 
  router.patch('/:id', getLift, async (req, res) => {
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
        const updatedLift = await res.lift.save();
        res.json(updatedLift);
    } catch (err){
        res.status(400).json({ message: err.message });
    }
  });
  

 //delete via the getter
 router.delete('/:id', getLift, async (req, res) =>{
    try {
        await res.lift.deleteOne();
        res.json({ message: 'Deleted Lift'});
    } catch (err){
        res.status(500).json({ message: err.message });
    }
 })


module.exports = router;