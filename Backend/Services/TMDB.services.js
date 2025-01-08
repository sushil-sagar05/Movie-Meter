const axios = require('axios');

module.exports.FetchMovieFromTMDB = async(movieId) =>{
    const apikey = process.env.TMDB_API_KEY;
    let url;
    
    if (movieId) {
        url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apikey}`;
    } else {
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`;
    }

    try {
        const response = await axios.get(url);
        return response.data.results || response.data; // Handle both single movie and list of movies
    } catch (error) {
        console.error('Error fetching movie from TMDb:', error);
        throw new Error('Failed to fetch movie from TMDb'); 
    }
}
