const blacklistTokenModel = require('../models/blacklistToken.model');
const userModel = require('../models/user.model');
const userService = require('../Services/user.services');
const {validationResult} = require('express-validator');
const {user} = require ('../models/user.model')
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
    res.cookie('token',token)
    res.status(200).json({token,user})
}
module.exports.getUserProfile = async(req,res,next) =>{
    res.status(200).json(req.user)
}
module.exports.logoutUser = async(req,res,next) =>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1]
    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
    if(!isBlacklisted){
        await blacklistTokenModel.create({token})
    }
    

    res.status(200).json({message:'user logged out'});
}
module.exports.favourites = async(req,res,next)=>{

try {
    const userId = req.user?._id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
const movieId = req.params;
if(user.favorites.includes(movieId)){
    return res.status(404).json({message:"Movie Already Present Here anon"})
}

    user.favorites.push(movieId)
await user.save()


res.status(200).json({
    success: true,
    message: "watchList Added",
    favorites:user.favorites,
  });
} catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Server error" });
}
}
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