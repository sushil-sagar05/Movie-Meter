const express = require('express');
const dotenv  = require("dotenv")
dotenv.config(
    {path:'.env'}
)
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectdb = require('./DB/db')

const app = express();
app.use(cookieParser());
connectdb();

app.set("trust proxy",1);

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],  
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Credentials','true');
    next()
})
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    res.send('Hello World');
});
const userRoutes = require('./routes/user.route')
const movieRoutes = require('./routes/movie.routes')
const ReviewRoutes = require('./routes/review.routes')
const DiscussionRoutes = require('./routes/discussion.routes')
app.use('/user',userRoutes);
app.use('/movies',movieRoutes)
app.use('/review',ReviewRoutes)
app.use('/movie',DiscussionRoutes)
module.exports = app;