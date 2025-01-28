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
    <div>
        {
          loading?
          <>
          {Array.from({ length: 1 }).map((_, i) => (
     <CardSkelton/>
   ))}
         </>:<div className='bg-[#141b23] h-full  rounded-lg border-2 border-pink-500  shadow-md w-80  mt-5'>
         
         <div className='w-full flex justify-center items-center '>
         <div className="cover  rounded-lg h-64 w-80  ">
         <Link to={`/movie/${random._id}`}>  <img className='h-64 w-80 rounded-lg' src={random.poster} alt="" /></Link>
          </div>
          </div>
          <div className="content h-56 ">
            <div className="name  text-[#797d80] text-sm">
              <span className='ml-1'>Name: {random.title}</span>
              <span className='ml-2'>Director:{random.director} </span>
              <h3 className='ml-2 h-12 font-serif '>Cast: {random.cast}</h3>
              <h3 className='ml-2'>Release : {random.year}</h3>
              <h3 className='ml-2'>Rating: {random.rating}</h3>
              
              <div className='flex justify-around  text-white items-center text-center pt-3'>

              <div className="Watch Now bg-yellow-500  w-1/2 h-9 font-semibold pt-2 rounded-lg text-center"><Link to='/watchnow'><button onClick={notify}>Watch Now</button></Link></div>
              </div>
            
              </div>
          </div>
        </div>

        }



        
    </div>
  )
}

export default RandomMovie
