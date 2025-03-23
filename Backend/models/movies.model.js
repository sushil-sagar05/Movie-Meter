const mongoose = require('mongoose')


const movieSchema = new mongoose.Schema({
 tmdbId:{
        type:Number,
        required:true,
        unique:true
    },
title:{
    type:String,
    required:true,
    unique:true
},
year:{
    type:String,
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
poster:{
    type:String,
    required:true
},
genres:{
    type:[String],
    required:true
},
reviews:[
    {
        type:mongoose.Schema.Types.ObjectId,
            ref:"reviewModel"
    }
],
Avgrating:{
    type:Number,
    default:null
},
cast:[
    {type:String,
    required:true}
]
})
const movieModel = mongoose.model('movie',movieSchema);
module.exports = movieModel;