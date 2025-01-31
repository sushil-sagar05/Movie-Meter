const dotenv  = require("dotenv")
const app = require('./app');
const connectdb =require('./DB/db')
dotenv.config(
    {path:'.env'}
)
connectdb ()
.then(()=>{
    app.listen(process.env.PORT || 8090,()=>{
        console.log(`Server is listening at PORT: ${process.env.PORT}`)
    })
})
