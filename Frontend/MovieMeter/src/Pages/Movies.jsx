import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import CardSkelton from '../Components/Skelton/CardSkelton';
import MovieCard from '../Components/MovieCard';
import Pagination from '../Components/Pagination';
import Footer from '../Components/Footer';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMovie, setTotalMovie] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery,setSearchQuery] = useState(" ")
  const LIMIT = 28;

  const fetchMovies = async (page,search) => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/movies/get-movies`, {
        params: { page, limit: LIMIT,search },
      });
      // console.log(response.data)
      setMovies(response.data.movies);
      setTotalMovie(response.data.total);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    setCurrentPage(1); 
    fetchMovies(1, searchQuery);
  };
  const totalPages =  Math.ceil(totalMovie / LIMIT);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
  <div className='bg-[#111111]'style={{ overflowX: 'hidden' }} >
      <div className=' w-full'>

     <Navbar />
      <h2 className='text-white text-4xl font-semibold text-center pb-5 pt-5'>Movies Section</h2>
      <div className='w-full  p-2 flex justify-center items-center'>
      <div className='h-[7vh] w-full sm:w-[85vw]  rounded-lg flex justify-center items-center'>
        <div className="input w-[64vw] sm:w-[32vw] h-[5vh]">
          <input
          className='w-full h-full rounded-md p-2'
          placeholder='Enter Movie name to search'
          type="text "
          value={searchQuery}
          onChange={handleSearchChange}
             />
        </div>
        <div className="button  p-2 mt-1">
          <button 
          className='w-[18vw] sm:w-[10vw] h-[5vh] bg-green-400 text-white rounded-md font-medium'
          onClick={handleSearchSubmit}
          >Search</button>
        </div>
      </div>
      </div>
      {loading ? (
        <>
        <div className='w-full md:flex'>
          {Array.from({ length: 10}).map((_, i) => (
            <CardSkelton key={i} />
          ))}
          </div>
        </>
      ) : (
        <div className='flex justify-center items-center'>
          <div className="Movies grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" style={{ overflowX: 'hidden' }}>
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
           </div>
      )}
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      <div className=''>
        <Footer/>
      </div>
    </div>
    
     </div>
  );
}

export default Movies;