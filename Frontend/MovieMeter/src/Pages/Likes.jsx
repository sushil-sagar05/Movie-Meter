import React, { useState,useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer';
import {  Link } from 'react-router-dom'
import axios from 'axios'
import CardSkelton from '../Components/Skelton/CardSkelton';
import { toast } from 'react-toastify';
function Likes() {
  const [liked, setliked] = useState([])
   const [loading, setloading] = useState(true)
  useEffect(()=>{
  
    const FetchLikes = async ()=>{
      try {
      const response =   await axios.get(`${import.meta.env.VITE_BASE_URL}/user/getLikes`,{
        withCredentials:true
      })
        
        setliked(response.data.LikedMovies)
      }catch (error) {
    
   }finally{
    setloading(false)
   }
  }
   FetchLikes()
  },[])
  const Dislike = async (movieId)=>{
    try {
     const response =  axios.delete(`${import.meta.env.VITE_BASE_URL}/user/deletelike`,{
        withCredentials:true,
        data : {movieId}
      })
     if(response.status===200){
      setliked(liked.filter(e=>e._id !==movieId))
      toast.success("Disliked")
     }else {
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
        Your All Liked Movie At One Place
      </h2>
      <h2 className='font-semibold text-lg p-3'>Like count  = {liked.length}</h2>
      <hr />
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
        {liked.length > 0 ? (
          liked.map((liked, idx) => (
            liked && (
              
              <div key={idx} className="box h-96 bg-[#141b23] border-2 border-red-500 mb-3 rounded-lg shadow-md w-80">
                <div className="cover h-64">
                  <img className='h-full w-full rounded-lg' src={liked.poster} alt="" />
                </div>
                <div className="content h-24 bg-[#141b23] rounded-lg text-white w-full">
                  <h2 className='ml-3'>Name: {liked.title}</h2>
                  <h2 className='ml-3'>Date Added: {liked.year}</h2>
                  <div className='flex justify-center items-center mt-1'>
                    
                    <button 
                   onClick={()=>Dislike(liked._id)}
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
  )
}

export default Likes