const axios = require('axios');

module.exports.FetchMovieFromTMDB = async (page=1) => {
  const apikey = process.env.TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&page=${page}`;


  try {
    const response = await axios.get(url);
    const movies = response.data.results || [response.data]; 
    
    // Fetch additional details for each movie
    const moviesWithDetails = await Promise.all(
      movies.map(async (movie) => {
        const creditsUrl = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apikey}`;
        const detailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apikey}`;

        const [creditsResponse, detailsResponse] = await Promise.all([
          axios.get(creditsUrl),
          axios.get(detailsUrl)
        ]);

        const director = creditsResponse.data.crew.find(
          (member) => member.department === 'Directing' && member.job === 'Director'
        );

        const cast = creditsResponse.data.cast.slice(0, 5).map((member) => member.name); // Get top 5 cast members
       
        return {
          id: movie.id,
          title: movie.title,
          release_date: movie.release_date,
          director: director ? director.name : 'Unknown',
          cast,
          // genres: movie.genres.map((genre) => genre.name),
          overview: movie.overview,
          poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, 
        };
      })
    );

    return moviesWithDetails;
  } catch (error) {
    console.error('Error fetching movies from TMDB:', error);
    throw error;
  }
};

