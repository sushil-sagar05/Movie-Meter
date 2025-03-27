import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {SyncLoader} from 'react-spinners'
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
const Overview =()=> {
    const [data, setdata] = useState([])
    const [error, setError] = useState(null);
    const [overview,setoverview] = useState ('')
     const [loading, setLoading] = useState(true);
    const { movieId } = useParams();
      useEffect(() => {
        const responsedata = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/movies/movie/${movieId}`);
           setdata(response.data);
          } catch (err) {
            setError('Failed to fetch movie details.');
            console.error('Error fetching movie:', err); 
          }
        };
        responsedata();
      }, [movieId]);
      useEffect(()=>{
        console.log(movieId)
        if (!movieId){
            console.error(" Movie ID is missing, API request not sent!");
            return;
        };
        const geminiResponse = async()=>{
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/movies/${movieId}/overview`,{
                })
                console.log(response.data)
                setoverview(response.data)
            } catch (error) {
                
            }
            setLoading(false)
        }
        geminiResponse()
      },[movieId])
  return (
    <div className='sm:h-[100vh]' style={{ overflowX: 'hidden' } }>
        <Navbar/>
    <div className=' w-[100vw] bg-white '>
            <h2 className='text-3xl font-bold text-center mb-2'>OVERVIEW</h2>
            <hr />
        <div className='   text-center sm:flex mt-2'>
            <hr />
            <div className="content  sm:h-[67vh] sm:w-[25vw] m-4 border-2 border-black rounded-lg   ">
            <div className='h-[45vh] sm:h-[30vh] sm:w-[25vw] p-1 rounded-lg '>
                <img 
                className='h-full w-full rounded-lg'
                src={data.poster} alt="" />
            </div>
            <hr />
            <div className='sm:h-[35vh] sm:w-[25vw] bg-[] '>
                <h2 className='text-left font-medium text-2xl p-2'>Movie : {data.title}</h2>
                <h2 className='text-left font-medium text-2xl p-2'>Cast : {data.cast}</h2>
                <h2 className='text-left font-medium text-2xl p-2'>Rating : {data.Avgrating===0 ?"unrated":data.Avgrating}</h2>


            </div>
            </div>
            <div className=' w-full  sm:w-[67vw] text-left bg-[#f8f7f5] p-2'>
                <p >{
                    loading?<SyncLoader />:`${overview}`
                    }</p>
                     <div className="button mt-2 font-bold">Finish Reading?<Link to={`/discussion/movie/${movieId}`}><button className='sm:w-48 ml-3 h-10 text-sm bg-green-500 hover:bg-green-800 hover:outline rounded-lg shadow-md font-medium '>Go to Discussion Room</button></Link></div>
                    
            </div>
         
        </div>
    </div>
    </div>
  )
}

export default Overview