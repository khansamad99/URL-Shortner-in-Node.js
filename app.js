const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const app = express();

//Init Middleware
connectDB();
app.use(express.json({extended:false}));

app.get('/',(req,res) => {
    res.send('Hello');
});

app.use('/',require('./routes/index'));
app.use('/api/url',require('./routes/url'));

const PORT = 3000;

app.listen(PORT,() => {
    console.log(`App is running on port ${PORT}`);
})