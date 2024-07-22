const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Lift = require('./models/lift')

mongoose.connect('mongodb://localhost/liftingdb');
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database Connected'));

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/lifts', async (req, res) => {
  try {
    const lifts = await Lift.find()
    res.json(lifts)
  } catch (err) {
    res.status(500).json({ message: err.message})
  }
});

app.post('/lifts', async (req, res) => {
  const lift = new Lift({
    extype: req.body.extype,
    weight: req.body.weight,
    sets: req.body.sets,
    reps: req.body.reps
  })

  try{
    const newLift = await lift.save();
    res.status(201).json(newLift);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});











