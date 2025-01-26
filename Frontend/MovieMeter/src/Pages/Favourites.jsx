import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CardSkelton from '../Components/Skelton/CardSkelton';
function Favourites() {
  const [favourite, setFavourite] = useState(null);
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
        setFavourite(response.data.favoriteMovies);
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      } finally{
        setloading(false)
      }
    };

    fetchFavourites();
  }, []);

  return (
    <div className='bg-[#111111]'>
      <Navbar />
      <div>
        <h2 className='text-center text-2xl md:text-4xl w-full border-black text-red-500 font-semibold border-2 rounded-lg'>
          Your All Favorite Movie At One Place
        </h2>
      </div>
      {
        loading?
        <>
        {Array.from({ length: 3 }).map((_, i) => (
      <CardSkelton/>
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
                      <button  className='w-36 h-10 bg-red-500 rounded-lg shadow-md'>Remove</button>
                    </div>
                  </div>
                </div>
              )
            ))
          ) : (
            <div>No favorite movies found.</div>
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