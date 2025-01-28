import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
function Popular() {
    const [popular, setpopular] = useState([]);
    const [loading, setloading] = useState(true)
    useEffect(()=>{

            const fetchPopular = async()=>{
                try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/movies/popular`)
            setpopular(response.data.movies)
            }catch (error) {
         
            
        }finally {
          setloading(false)
        }
      }
        fetchPopular();
    },[])

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-white gap-8'>
      {
        popular.map((pop,idx)=>{
            return (
                <div
                key={idx}
                className='bg-[#141b23]  rounded-lg shadow-md w-80 ml-5 mt-5'>
          <div className="cover rounded-lg h-72 w-80  ">
            <img className='h-full w-full rounded-lg' src={pop.poster} alt="" />
          </div>
          <div className="content h-32">
            <div className="name  text-[#797d80] text-sm">
              <span className='ml-1'>Title :{pop.title}</span>
              <span className='ml-2'>Director: {pop.director} </span>
              <div>
              <span className='ml-2'>Cast: {pop.cast}</span>
              <span className='ml-2'>Release date: {pop.year}</span>
              <span>Review:5★★★★★</span>
              </div>
              <div className='flex justify-around  text-white items-center text-center pt-3'>
              <div className="Review bg-yellow-500   h-9 font-semibold pt-2 w-1/2 rounded-lg mr-2"><Link to={`/movie/${pop._id}/review`}><button>Review</button></Link></div>
              <div className="Watch Now bg-yellow-500  w-1/2 h-9 font-semibold pt-2 rounded-lg text-center"><Link to='/watchnow'><button>Watch Now</button></Link></div>
              </div>
              </div>
          </div>
        </div>
            )
        })
      }
        </div>
  )
}

export default Popular