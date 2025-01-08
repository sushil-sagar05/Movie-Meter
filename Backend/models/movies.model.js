const mongoose = require('mongoose')


const movieSchema = new mongoose.Schema({
title:{
    type:String,
    required:true,
    unique:true
},
year:{
    type:Number,
    required:true
},
director:{
    type:String,
    //required:true
},
plot:{
    type:String,
    required:true
},
genre:[{
    type:String,
    required:true
},],
reviews:[
    {
        type:mongoose.Schema.Types.ObjectId,
            ref:"reviewModel"
    }
],
rating:{
    type:Number,
    default:0
}
})
const movieModel = mongoose.model('movie',movieSchema);
module.exports = movieModel;