import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import CardSkelton from '../Components/Skelton/CardSkelton'
import { toast } from 'react-toastify';
function RandomMovie() {
    const [random, setrandom] = useState('');
    const [loading, setloading] = useState(true)
    useEffect(()=>{

            const fetchRandom = async()=>{
                try {
                const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/movies/random`)
            
            setrandom(data.movie)
            }catch (error) {
         
            
        }finally {
          setloading(false)
        }
      }
        fetchRandom();
    },[])
    const notify =()=>{
      toast.info("Service Unavailable")
    }
  return (
    <div style={{ overflowX: 'hidden' }}>
        {
          loading?
          <>
          {Array.from({ length: 1 }).map((_, i) => (
     <CardSkelton/>
   ))}
         </>:<>
         <div className="container grid sm:grid-cols-12 min-h-80 m-8 sm:m-0 ">
          <div className=' col-span-4  w-80 h-96 sm:h-full p-4 sm:w-full text-white rounded-lg shadow-lg border '>
            <div className="inner flex rounded-lg h-72 w-full ">
              <div className="image rounded-lg h-72 sm:w-1/2   m-4">
                <img 
                className='h-64 w-full  rounded-lg'
                src={random.poster} alt="" />
              </div>
              <div className="content w-1/2 m-1   py-1">
                <h2 className='text-sm p-1  sm:text-md font-normal'>Name: {random.title}</h2>
                <h2 className='text-sm p-1 sm:text-md font-normal'>Director:{random.director??"Unknown"} </h2>
                <h2 className='text-sm p-1 sm:text-md font-normal'>Cast: {random.cast.slice(0,2).join(",")??"Unknown"}</h2>
                <h2 className='text-sm p-1 sm:text-md font-normal'>Release : {random.year}</h2>
                <h2 className='text-sm p-1 sm:text-md font-normal'>Rating: {random.Avgrating}</h2>
                <div className="button mt-2"><Link to='/watchnow'><button className='w-24 h-10  bg-green-500 hover:bg-green-800 hover:outline rounded-lg shadow-md '>Watch Now</button></Link></div>
              </div>
            </div>
          </div>
          <div className='col-span-8  rounded-lg shadow-lg border hidden sm:block'>
            <h2 className='text-md text-white font-semibold m-8 py-4'>
            Each day, we highlight a movie that deserves your attention — from iconic classics to hidden gems and the latest releases. Explore the film's plot, themes, and characters, and get a deeper understanding of what makes it special. After watching, join the community discussion and share your thoughts, opinions, and interpretations. Whether you're a casual viewer or a film enthusiast, the "Movie of the Day" is the perfect way to discover something new and connect with fellow movie lovers. Don’t miss out — come back every day for a fresh cinematic experience!            </h2>
          </div>
         </div>
         
         
         
         
         </>

        }



        
    </div>
  )
}

export default RandomMovie
