const axios = require('axios');

module.exports.FetchMovieFromTMDB = async (movieId) => {
  const apikey = process.env.TMDB_API_KEY;
  let url;

  if (movieId) {
    url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apikey}`;
  } else {
    url = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`;
  }

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
        const genres = detailsResponse.data.genres.map((genre) => genre.name);

        return {
          ...movie,
          director: director ? director.name : 'Unknown',
          cast: cast.join(', '),
          genres: genres.join(', ')
        };
      })
    );

    return moviesWithDetails;
  } catch (error) {
    console.error('Error fetching movie from TMDb:', error);
    throw new Error('Failed to fetch movie from TMDb');
  }
};
