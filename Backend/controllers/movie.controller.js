const { validationResult } = require('express-validator');
const movieService = require('../Services/TMDB.services');
const Movie = require('../models/movies.model'); 

module.exports.getMovies = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
   const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit)||10;
    const skip =(page-1)*limit;
    // apiData = apiData.skip(skip).limit(limit)

  
    try {
      const totalMovies = await Movie.countDocuments()
      // Fetch movies from database 
      let movies = await Movie.find().skip(skip).limit(limit); 
  
      // If no movies found, fetch from TMDb
      if (movies.length === 0) {
        const tmdbMovies = await movieService.FetchMovieFromTMDB(5); 
  
        // Limit saving to 500 movies (adjust as needed)
        // const moviesToSave = tmdbMovies.slice(0, 500); 
  
        const savedMovies = await Promise.all(
          tmdbMovies.map(async (tmdbMovie) => {
            const newMovie = new Movie({
              tmdbId: tmdbMovie.id,
              title: tmdbMovie.title,
              year: tmdbMovie.release_date.substring(0, 4),
              director: tmdbMovie.director ? tmdbMovie.director.name : 'Unknown',
              cast: tmdbMovie.cast ,
            plot: tmdbMovie.overview,
            poster:  tmdbMovie.poster_path ,
            });
            return await newMovie.save();
          })
        );
  
        movies = savedMovies;
      }
      
      return res.status(200).json({movies,total:totalMovies});
    } catch (error) {
      console.error('Error fetching movies:', error);
      res.status(500).json({ error: 'Failed to fetch movies' });
    }
  };

module.exports.getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    return res.status(200).json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
};

module.exports.addMovie = async(req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const{title,year,plot,director,genre,user} = req.body;
    const data = {
        user,
        title,
        year,
        plot,
        director,
        genre
    }
    const newMovie = new Movie(data)
    const save = await newMovie.save()
    return res.status(201).json({ success: true, message: "Movie Published Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
      
    }

};
module.exports.RandomMovie = async(req,res,next)=>{
    try {
        const count = await Movie.countDocuments();
        if(count===0){
            res.status(404).json({message:"No Movie found"})
        }
        const random = Math.floor(Math.random()*count);
        const movie = await Movie.findOne().skip(random);
        return res.status(200).json({movie})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
module.exports.Popular = async(req,res,next)=>{
    try {
      const count = await Movie.countDocuments();
      if (count === 0) {
        return res.status(404).json({ message: "No movies found" });
      }
  
      const movies = await Movie.aggregate([
        { $sample: { size: 5 } } 
      ]);
  
      return res.status(200).json({ movies });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  
}