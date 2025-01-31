const dotenv  = require("dotenv")
const app = require('./app');
const connectdb =require('./DB/db')
dotenv.config(
    {path:'.env'}
)
connectdb ()
try {
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is listening at PORT : ${process.env.PORT}`)
    })
} catch (error) {
    console.log("MongoDB connection Failed !!!",err);
}
