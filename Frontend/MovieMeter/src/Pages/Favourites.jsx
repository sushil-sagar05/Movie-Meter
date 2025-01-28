import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CardSkelton from '../Components/Skelton/CardSkelton';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
function Favourites() {
  const [favourite, setFavourite] = useState([]);
const [loading, setloading] = useState(true)
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/getfavourites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response.data.favoriteMovies[0]._id)
        setFavourite(response.data.favoriteMovies);
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      } finally{
        setloading(false)
      }
    };


    fetchFavourites();
  }, []);


  const removeFavorite = async(movieId)=>{
    // console.log(movieId)
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
          toast.success("Movie Removed")
        } else {
          console.error(response.data.message); 
        }
        } catch (error) {
          
        }
      }

  
  return (
    <div className=''>
      <Navbar />
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
        
          {favourite.length > 0 ? (
            favourite.map((favourite, idx) => (
              favourite && (
                
                <div key={idx} className="box h-96 w-80">
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
            <div className='bg-white'>
            <h3 className='text-3xl  font-serif'>No Favourite Found For Yours!</h3>
            <h4 className='text-xl pb-4 font-semibold text-red-500'>Make to See Here :D</h4>
          <Link to='/movies'> <button className='w-64 h-10 bg-green-500 rounded-lg shadow-md text-white font-semibold ml-16'>Go To Movies</button></Link>
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