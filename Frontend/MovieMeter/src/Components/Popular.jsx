import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CardSkelton from '../Components/Skelton/CardSkelton'
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
    <>
    {
      loading ?
      <div className='w-full md:flex'>
      {Array.from({ length: 10}).map((_, i) => (
        <CardSkelton key={i} />
      ))}
      </div>
    :
    <div className='grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-white gap-8'>
      {
        popular.map((pop,idx)=>{
            return (
                <div
                key={idx}
                className='bg-[#141b23] border-2 border-rounded-lg shadow-md h-full rounded-lg  w-80 ml-5 mt-5'>
         <div className='flex  justify-center items-center pt-2'>
         <div className="cover rounded-lg h-64 w-72 flex items-center justify-center ">
            <img className='h-full w-80 rounded-lg' src={pop.poster} alt="" />
          </div>
         </div>
          <div className="content p-1 h-34">
            <div className="name  text-[#797d80] text-sm">
              <h3 className='ml-1'>Title :{pop.title}</h3>
              <h3 className='ml-2'>Director: {pop.director} </h3>
              <div>
              <h3 className='ml-2'>Cast: {pop.cast.slice(0,2).join(", ")}</h3>
              <h3 className='ml-2'>Release date: {pop.year}</h3>
              <h3>Rating:{pop.Avgrating}</h3>
              </div>
              <div className='flex justify-around  text-white items-center text-center m-1'>
              <div className="Review bg-green-500 hover:bg-green-700 hover:outline   h-9 font-semibold pt-2 w-1/2 rounded-lg mr-2"><Link to={`/movie/${pop._id}/review`}><button>Review</button></Link></div>
              <div className="Watch Now bg-green-500  hover:bg-green-700 hover:outline w-1/2 h-9 font-semibold pt-2 rounded-lg text-center"><Link to='/watchnow'><button>Watch Now</button></Link></div>
              </div>
              </div>
          </div>
        </div>
            )
        })
      }
        </div>}
        </>
  )
}

export default Popular