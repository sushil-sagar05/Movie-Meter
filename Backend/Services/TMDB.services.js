const axios = require('axios');

module.exports.FetchMovieFromTMDB = async (totalPages = 500) => {
  const apikey = process.env.TMDB_API_KEY;
  let allMovies = [];
  const delay =(ms)=>new Promise(resolve=>setTimeout(resolve,ms));
  for (let page = 1; page <= totalPages; page++) {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&page=${page}`;

    try {
      const response = await axios.get(url);
      const movies = response.data.results || [response.data];

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

          const cast = creditsResponse.data.cast.slice(0, 5).map((member) => member.name);
          const genres = detailsResponse.data.genres.map((genre)=>genre.name);

          return {
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            director: director ? director.name : 'Unknown',
            cast,
            genres,
            overview: movie.overview,
            poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          };
        })
      );

      allMovies = allMovies.concat(moviesWithDetails);
      await delay(1000);
    } catch (error) {
      console.error('Error fetching movies from TMDB:', error);
      throw error;
    }
  }

  return allMovies;
};
