import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import CardSkelton from '../Components/Skelton/CardSkelton';
import MovieCard from '../Components/MovieCard';
import Pagination from '../Components/Pagination';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMovie, setTotalMovie] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT = 10;

  const fetchMovies = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/movies/get-movies`, {
        params: { page, limit: LIMIT },
      });
      // console.log(response.data.total);
      setMovies(response.data.movies);
      setTotalMovie(response.data.total);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);
// console.log(totalMovie)
  const totalPages =  Math.ceil(totalMovie / LIMIT);
  // console.log(totalPages)

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='bg-[#111111] w-full' style={{ overflowX: 'hidden' }}>
      <Navbar />
      <h2 className='text-white text-4xl font-semibold text-center pb-5 pt-5'>Movies Section</h2>
      {loading ? (
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <CardSkelton key={i} />
          ))}
        </>
      ) : (
        <div className="Movies grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
}

export default Movies;