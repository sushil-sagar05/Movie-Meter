const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectdb = require('./DB/db')
const userRoutes = require('./routes/user.route')
const movieRoutes = require('./routes/movie.routes')
const app = express();
connectdb();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    res.send('Hello World');
});
app.use('/user',userRoutes);
app.use('/movies',movieRoutes)
module.exports = app;