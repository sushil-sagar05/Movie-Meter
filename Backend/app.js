const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectdb = require('./DB/db')
const userRoutes = require('./routes/user.route')
const movieRoutes = require('./routes/movie.routes')
const ReviewRoutes = require('./routes/review.routes')
const DiscussionRoutes = require('./routes/discussion.routes')
const app = express();
connectdb();
app.set("trust proxy",1);
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],  
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,                  
    methods: ['GET', 'POST', 'OPTIONS'],  
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));
app.use(cookieParser());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Credentials','true');
    next()
})
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    res.send('Hello World');
});
app.use('/user',userRoutes);
app.use('/movies',movieRoutes)
app.use('/review',ReviewRoutes)
app.use('/movie',DiscussionRoutes)
module.exports = app;