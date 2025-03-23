const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    movie:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"movie"
        },
        rating:{
            type:Number,
            required:true,
            enum:[1,2,3,4,5]
        },
   
    comment:{
    type:String,
    required:true,
},

},{timestamps:true})
const reviewModel = mongoose.model('review',reviewSchema);
module.exports = reviewModel;