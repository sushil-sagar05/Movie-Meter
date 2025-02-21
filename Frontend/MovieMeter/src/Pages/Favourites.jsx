import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CardSkelton from '../Components/Skelton/CardSkelton';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Rating3 from '../Components/svgs/Rating3';
import Rating4 from '../Components/svgs/Rating4';
import Rating1 from '../Components/svgs/Rating1';
function Favourites() {
  const [favourite, setFavourite] = useState([]);
const [loading, setloading] = useState(true)
const [length, setlength] = useState([])
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/getfavourites`, {
          withCredentials:true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavourite(response.data.favoriteMovies);
        setlength(response.data.favoriteMovies.length)
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      } finally{
        setloading(false)
      }
    };


    fetchFavourites();
  }, []);


  const removeFavorite = async(movieId)=>{
        try {
          const token = localStorage.getItem('token')
        const response =  await axios.delete(`${import.meta.env.VITE_BASE_URL}/user/deletefavourite`,{
            headers:{
              Authorization:`Bearer ${token}`
            },
            data: { movieId }
           
        })
        if (response.status === 200) {
          
          setFavourite(favourite.filter(fav => fav._id !== movieId));  
         setlength(length-1)
          toast.success("Movie Removed")
        } else {
          console.error(response.data.message); 
        }
        } catch (error) {
          
        }
      }

  
  return (
    <div className='w-full bg-[#f4f4f4] 'style={{ overflowX: 'hidden' }}>
      <div>
      <Navbar />
      </div>
      <div>
        <h2 className='text-center text-2xl md:text-4xl w-full  text-red-500 font-semibold border-2 rounded-lg'>
          Your All Favorite Movie At One Place
        </h2>
      </div>
      {
        loading?
        <>
        {Array.from({ length: 3 }).map((_, i) => (
      <CardSkelton key={i}/>
    ))}
        </>:
        <div className='flex justify-center items-center'>
        <div className='  mt-4'>
          {
            length ? <h2 className='font-semibold'>Favourite: {length}</h2> :""
          }
          {favourite.length > 0 ? (
            favourite.map((favourite, idx) => (
              favourite && (
                
                <div key={idx} className="box h-96 bg-[#141b23] mb-3 rounded-lg shadow-md w-80">
                  <div className="cover h-64">
                    <img className='h-full w-full rounded-lg' src={favourite.poster} alt="" />
                  </div>
                  <div className="content h-24 bg-[#141b23] rounded-lg text-white w-full">
                    <h2 className='ml-3'>Name: {favourite.title}</h2>
                    <h2 className='ml-3'>Date Added: {favourite.year}</h2>
                    <div className='flex justify-center items-center mt-1'>
                      
                      <button 
                      onClick={() => removeFavorite(favourite._id)}
                      className='w-36 h-10 bg-red-500 rounded-lg shadow-md'>Remove</button>
                     
                    </div>
                  </div>
                </div>
              )
            ))
          ) : (
            <div className='sm:min-h-[65vh] sm:min-w-[95vw]  sm:m-4 rounded-lg '>
            <h2 className='text-center text-3xl font-semibold p-2'>You have Not Made Favourites yet !</h2>
           
            <div className=' min-h-[45vh] max-w-[95vw] grid  sm:grid-cols-12 gap-4  m-3'>
            <div className=' sm:h-[35vh] sm:w-[15vw]  rounded-full border-2 border-black  m-10 sm:col-span-4'>
              <img
              className='h-full w-full'
              src="https://cdn-icons-png.flaticon.com/512/2297/2297834.png" alt="" />
            </div>
            <div className=' rounded-lg p-2 sm:col-span-8'>
              <h2 className=' text-2xl sm:text-5xl font-semibold'>"Your favorites are feeling a bit lonely! 😜 Pop some movies on that list and let the movie magic begin! 🍿✨"</h2>
              <Link to='/movies'> <button className='w-64 h-10 bg-green-500 rounded-lg shadow-md text-white font-semibold  m-10'>Start Exploring</button></Link>
            </div>
            </div>
           </div>
          )}
        </div>
        </div>
              }
      
      <div className='text-white'>
        <Footer/>
      </div>
    </div>
  );
}

export default Favourites;