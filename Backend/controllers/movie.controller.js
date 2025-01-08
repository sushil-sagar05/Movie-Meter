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
                        plot: tmdbMovie.overview, 
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

module.exports.getMovieById = async(req,res,next) =>{
    try {
        let movies = await Movie.findById(req.params.id);
        if (movies.length === 0) {
            const tmdbMovies = await movieService.FetchMovieFromTMDB();
            const savedMovies = await Promise.all(
                tmdbMovies.map(async (tmdbMovie) => {
                    const newMovie = new Movie({
                        title: tmdbMovie.title,
                        year: tmdbMovie.release_date.substring(0, 4),
                        director: tmdbMovie.director,
                        plot: tmdbMovie.overview, 
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