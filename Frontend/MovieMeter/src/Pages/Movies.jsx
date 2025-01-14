import React, {useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import axios from 'axios'
import MovieCard from '../Components/MovieCard'
function Movies() {
      const [movies, setMovies] = useState([])
      const fetchMovies = async () => {
          try {
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/movies/get-movies`);
            setMovies(data);
          } catch (error) {
            console.error('Error fetching movies:', error);
          }
        };
  useEffect(()=>{
    fetchMovies();
  },[])
// console.log(movies)


  return (
    <div className='bg-[#111111]  w-full'>
        <Navbar/>
 <h2 className='text-white text-4xl font-semibold text-center pb-5 pt-5'>Movies Section</h2>
    <div className="categoryMenu flex gap-2">
        <input type="search" 
        placeholder='Search Movies with Name'
        className='w-60 h-10 rounded-lg ml-5 pl-3  border-2 border-r-0 border-pink-700'
        />
    <button className='bg-yellow-500 w-24 rounded-lg border-2 border-l-0  font-semibold hover:bg-yellow-400'>Search</button>
    </div>
    <div className="Movies  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    
        {
          movies.map((movie)=>{
            return(
              <MovieCard key={movie.id} movie={movie}/>
            )
          })
        }
      
    </div>
    </div>
  )
}

export default Movies
