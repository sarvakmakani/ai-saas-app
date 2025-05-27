const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectdb = require('./db/dbconnect');
const userRoutes = require('./routes/userRoute');
const messageRoutes = require('./routes/messageRoutes');
// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'ejs');
dotenv.config();


// connect db
connectdb();

// Import routes


app.use('/user',userRoutes);
app.use('/messages',messageRoutes);

module.exports = app;