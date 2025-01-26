import React, {useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import axios from 'axios'
import MovieCard from '../Components/MovieCard'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import CardSkelton from '../Components/Skelton/CardSkelton'
function Movies() {
      const [movies, setMovies] = useState([])
      const [loading, setloading] = useState(true)
      const fetchMovies = async () => {
          try {
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/movies/get-movies`);
            setMovies(data);
          } catch (error) {
            console.error('Error fetching movies:', error);
          } finally{
            setloading(false)
          }
        };
  useEffect(()=>{
    fetchMovies();
  },[])


  return (
    <div className='bg-[#111111]  w-full'>
        <Navbar/>
 <h2 className='text-white text-4xl font-semibold text-center pb-5 pt-5'>Movies Section</h2>
    {
      loading ? 
      <>
            
      {Array.from({ length: 10 }).map((_, i) => (
      <CardSkelton/>
    ))}
      
      </>
      :
      <div className="Movies  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    
      {
        movies.map((movie)=>{
          return(
            <MovieCard key={movie.id} movie={movie}/>
          )
        })
      }

    
  </div>
    }
   
    </div>
  )
}

export default Movies