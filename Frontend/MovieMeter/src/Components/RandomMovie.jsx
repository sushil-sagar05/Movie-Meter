import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import CardSkelton from '../Components/Skelton/CardSkelton'
function RandomMovie() {
    const [random, setrandom] = useState('');
    const [loading, setloading] = useState(true)
    useEffect(()=>{

            const fetchRandom = async()=>{
                try {
                const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/movies/random`)
            
            setrandom(data.movie)
            // console.log(data.movie)
            }catch (error) {
         
            
        }finally {
          setloading(false)
        }
      }
        fetchRandom();
    },[])
  return (
    <div>
        {
          loading?
          <>
          {Array.from({ length: 1 }).map((_, i) => (
     <CardSkelton/>
   ))}
         </>:<div className='bg-[#141b23] h-full rounded-lg shadow-md w-80  mt-5'>
         <Link to={`/movie/${random._id}`}><div className="cover rounded-lg h-64 w-80  ">
            <img className='h-full w-full rounded-lg' src={random.poster} alt="" />
          </div>
          </Link>
          <div className="content h-56 ">
            <div className="name  text-[#797d80] text-sm">
              <span className='ml-1'>Name: {random.title}</span>
              <span className='ml-2'>Director:{random.director} </span>
              <h3 className='ml-2 h-12 font-serif '>Cast: {random.cast}</h3>
              <h3 className='ml-2'>Release : {random.year}</h3>
              <h3 className='ml-2'>Rating: {random.rating}</h3>
              
              <div className='flex justify-around  text-white items-center text-center pt-3'>

              <div className="Watch Now bg-yellow-500  w-1/2 h-9 font-semibold pt-2 rounded-lg text-center"><Link to='/watchnow'><button>Watch Now</button></Link></div>
              {/* <div className="Watch Now bg-yellow-500  w-1/2 h-9 font-semibold pt-2 rounded-lg text-center"><button>Go To Discussion</button></div> */}
              </div>
            
              </div>
          </div>
        </div>

        }



        
    </div>
  )
}

export default RandomMovie
