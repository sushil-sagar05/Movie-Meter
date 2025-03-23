const { validationResult } = require('express-validator');
const movieService = require('../Services/TMDB.services');
const Movie = require('../models/movies.model'); 

module.exports.getMovies = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 25;
  const skip = (page - 1) * limit;

  try {
    let totalMovies = await Movie.countDocuments();

  
    if (totalMovies === 0) {
      console.log("Fetching movies from TMDB...");
      const totalPages = 500; 
      const tmdbMovies = await movieService.FetchMovieFromTMDB(totalPages);

      if (tmdbMovies.length > 0) {
        
        await Promise.all(
          tmdbMovies.map(async (tmdbMovie) => {
            await Movie.updateOne(
              { tmdbId: tmdbMovie.id }, 
              {
                $set: {
                  title: tmdbMovie.title,
                  year: tmdbMovie.release_date ? tmdbMovie.release_date.substring(0, 4) : "Unknown",
                  director: tmdbMovie.director || "Unknown",
                  cast: tmdbMovie.cast || [],
                  genres: tmdbMovie.genres || [],
                  plot: tmdbMovie.overview || "No overview available",
                  poster: tmdbMovie.poster_path || null,
                },
              },
              { upsert: true } 
            );

           
            await new Promise((resolve) => setTimeout(resolve, 500)); 
          })
        );

        totalMovies = await Movie.countDocuments(); 
      }
    }

    const movies = await Movie.find().skip(skip).limit(limit);
    return res.status(200).json({ movies, total: totalMovies });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Failed to fetch movies" });
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