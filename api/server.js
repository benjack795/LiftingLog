const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();


mongoose.connect('mongodb://localhost/liftingdb');
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database Connected'));

app.use(cors());
app.use(express.json());

const liftsRouter = require('./routes/lifts')
app.use('/lifts', liftsRouter)

const photosRouter = require('./routes/photos')
app.use('/photos', photosRouter)

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});











