const express = require('express');
const connectdb = require('./DB/db')
const dotenv  = require("dotenv")
dotenv.config(
    {path:'.env'}
)
connectdb();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());


app.set("trust proxy",1);

const corsOptions = {
    origin: (origin, callback) => {
  
      const allowedOrigin = process.env.FRONTEND_URL;

      if (origin === allowedOrigin || !origin) {
        callback(null, true);  
      } else {
  
        callback(new Error('Not allowed by CORS'), false);  
      }
    },
    credentials: true, 
    methods: ['GET', 'POST', 'OPTIONS','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
  app.use(cors(corsOptions));
  

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
const recommendationRoute = require('./routes/recommondation.route')
app.use('/user',userRoutes);
app.use('/movies',movieRoutes)
app.use('/review',ReviewRoutes)
app.use('/movie',DiscussionRoutes)
app.use('/recommondations',recommendationRoute)
module.exports = app;