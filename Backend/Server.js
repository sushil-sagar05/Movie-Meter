const dotenv  = require("dotenv")
const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./Socket');
const server = http.createServer(app)
initializeSocket(server);


try {
    server.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is listening at PORT : ${process.env.PORT}`)
    })
} catch (error) {
    console.log("MongoDB connection Failed !!!",err);
}
