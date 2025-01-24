const { validationResult } = require('express-validator');
const movieService = require('../Services/TMDB.services');
const Movie = require('../models/movies.model'); 

module.exports.getMovies = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
                
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let movies = await Movie.find();
        if (movies.length === 0) {
            const tmdbMovies = await movieService.FetchMovieFromTMDB();
            const savedMovies = await Promise.all(
                tmdbMovies.map(async (tmdbMovie) => {
                    const newMovie = new Movie({
                        title: tmdbMovie.title,
                        year: tmdbMovie.release_date.substring(0, 4),
                        director: tmdbMovie.director,
                        cast: tmdbMovie.cast,
                         genres: tmdbMovie.genres,
                        plot: tmdbMovie.overview,
                        poster: tmdbMovie.poster_path  
                    });
                    return await newMovie.save();
                })
            );
            movies = savedMovies;
        }
        return res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
}

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