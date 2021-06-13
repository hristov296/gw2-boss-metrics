require('dotenv').config({ path: './config/.env' });

const express = require('express');
const cors = require('cors');
const passport = require('./config/passport');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");

const auth = require('./routes/api/auth');
const google = require('./routes/api/google');

mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err));

const app = express();
app.use(cors({
  origin: 'https://staging.irithyll.com'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(passport.initialize());

app.use('/api/auth/', auth);
app.use('/google/', google);
// Add this line below

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(`THIS IS UR PROFILE MAAANNNN ${req.user.email}`)
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Sever ARG0 listening on port ${port}`)
})