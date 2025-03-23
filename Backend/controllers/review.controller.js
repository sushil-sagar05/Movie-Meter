const {validationResult} = require('express-validator');
const Reveiw = require('../models/review.models');
const Movie = require('../models/movies.model')
const User = require('../models/user.model')
//Create Reveiw and get Review
module.exports.postReview = async(req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    try {
        const user = req.user;
    const {movieId} = req.params;
   
    const {comment,rating} = req.body;
    const movie = await Movie.findById(movieId);
    if(!movie){
        return res.status(400).json({message:"No Movie Found"})
    }
    const newReview = new Reveiw({
        user:user._id,
        movie:movieId,
        comment,
        rating
        
    })
    const savedReview = await newReview.save(); 
    const populatedReview = await savedReview.populate('user', 'fullname'); 
    const fetchReview = await Reveiw.find({movie:movieId},'rating');
    if(!fetchReview){
        return res.status(400).json({message:"No Review found for this movie"})
    }
    const ratings=fetchReview.map(reveiw=>reveiw.rating);
    const ratinglength = ratings.length;
    const Avgrating = ratinglength>0 ? ratings.reduce((sum,r)=>sum+r,0)/ratinglength:0;
    await Movie.findByIdAndUpdate(movieId,{Avgrating});
       res.status(201).json(populatedReview)
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: 'Error creating review' });
  
    }

}
module.exports.getReview = async(req,res,next) =>{
    try {
        const {movieId} = req.params;

    const getReviews = await Reveiw.find({movie:movieId}).populate('user', 'fullname')
    if(!getReviews){
        res.status(500).json({message:"Internal server Error"})
    }
    
    res.status(200).json(getReviews);
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: 'Error fetching review' });
    }
}
module.exports.getuserReview = async(req,res)=>{
    const userId = req.user._id;
    const ReviewGiven = await Reveiw.find({user:userId}).populate('movie', 'title')
    res.status(200).json(ReviewGiven)
}








