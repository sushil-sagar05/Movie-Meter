const blacklistTokenModel = require('../models/blacklistToken.model');
const userModel = require('../models/user.model');
const userService = require('../Services/user.services');
const {validationResult} = require('express-validator');
const movieModel = require('../models/movies.model')
const mongoose = require('mongoose')

module.exports.registerUser = async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {fullname,email,password} = req.body;
    const isUserArlearyRegisterd = await userModel.findOne({email});
    if(isUserArlearyRegisterd){
        return res.status(400).json({message: "User Already Exist"})
    }
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword
    });
    const token = user.generateAuthToken();
    res.cookie('token',token,{
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      sameSite:"None",
      maxAge:360000000
    })
    res.status(201).json({token,user});
}
module.exports.loginUser = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password} = req.body;
    const user = await userModel.findOne({email}).select('+password')
    if(!user){
        return res.status(401).json({message:'Invalid email or Password'})
    }
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'})
    }
    const token = user.generateAuthToken();
    res.cookie('token',token,{
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      sameSite:"None",
      maxAge:360000000
    })
    res.status(200).json({token,user})
}
module.exports.getUserProfile = async(req,res,next) =>{
    res.status(200).json(req.user)
}
module.exports.logoutUser = async(req,res,next) =>{
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    const existingToken = await blacklistTokenModel.findOne({ token });
    if (existingToken) {
      return res.status(200).json({ message: 'Token already blacklisted' });
    }

    const newBlacklistToken = new blacklistTokenModel({ token });
    await newBlacklistToken.save();

    res.status(200).json({ message: 'User logged out and token blacklisted' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Token already blacklisted' });
    }
    console.error('Error logging out user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
module.exports.favourites = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { movieId } = req.params; 
    if (user.favorites.includes(movieId)) {
      return res.status(400).json({ message: "Movie already present in favorites" });
    }

    user.favorites.push(movieId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Movie added to favorites",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error('Error adding movie to favorites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.likes = async(req,res,next)=>{
 try {
    const userId = req.user._id;
    const movieId = req.params.movieId;
    const user = await userModel.findByIdAndUpdate(userId, {
        $addToSet: { likes: {movieId }},
        $pull: { dislikes:{ movieId} } 
      }, { new: true });
    res.status(200).json({
      success: true,
      message: "Likes",
      Likes:user.likes,
    });
 } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Server error" });
 }
}
module.exports.dislikes = async(req,res,next)=>{
    try {
        const userId = req.user._id;
        const movieId = req.params.movieId;
        const user = await userModel.findByIdAndUpdate(userId, {
            $addToSet: { dislikes: {movieId }},
            $pull: { likes: {movieId} } 
          }, { new: true });
        res.status(200).json({
          success: true,
          message: "Disliked",
          dislikes:user.dislikes,
        });
     } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" });
     }
}
module.exports.getLiked = async(req,res,next)=>{
   try {
    const userId = req.user._id;
    const user = await userModel.findById(userId)
    if(!user){
        res.status(400).json({message:"No User"})
    }
   
    return res.status(200).json({ success: true, likes:user.likes });
   } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Server error" });
   }
}
module.exports.getFavorites = async (req, res, next) => {
    try {
        const userId = req.user._id;
    
        const user = await userModel.findById(userId)
          .populate('favorites', 'movieId'); 
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' }); 
        }
    
        const favoriteMovieIds = user.favorites; 
        const favoriteMovies = await movieModel.find({ _id: { $in: favoriteMovieIds } }); 
        res.status(200).json({ 
          favoriteMovies: favoriteMovies 
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
      }
};
module.exports.deleteFavorites = async(req,res,next)=>{
  try {
    const userId = req.user._id; 
    const { movieId } = req.body;  

   
    const user = await userModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { favorites: movieId } },  
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Movie removed from favorites" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}