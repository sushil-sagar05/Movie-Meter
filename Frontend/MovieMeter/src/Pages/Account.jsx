import React,{useState,useEffect} from 'react'
import Navbar from '../Components/Navbar'
import { FaRegUser } from "react-icons/fa6";
import axios from 'axios'
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import ContributionsSkelton from '../Components/Skelton/ContributionsSkelton';
import Rating2 from '../Components/svgs/Rating2';

function Account() {
 const [contributions, setcontributions] = useState([])
 const [loading, setloading] = useState(true)
   const [error, setError] = useState('')
const fetchAllReviews = async()=>{
  try {
    const token = localStorage.getItem('token');
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/review/getallreview`,{
    withCredentials:true,
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  
  setcontributions(response.data)
  } catch (error) {
    setError('Error fetching data2:', error);
  } finally{
    setloading(false)
  }
};
  useEffect(()=>{
    fetchAllReviews();
  },[])

  return (
    <>
    <div className='bg-[#f4f4f4]  w-full'>
        <Navbar/>
        <h2 className='text-white text-4xl flex justify-center font-semibold text-center pb-5 pt-5 '>
         <h1 className='bg-red-500 w-56'>Contributions</h1>
          </h2>
        <hr />
        {
          loading ?     
            <>
            
            {Array.from({ length: 10 }).map((_, i) => (
            <ContributionsSkelton/>
          ))}
            
            </>
        :<div> 

          {
            contributions ? <h2>Contributions :{contributions.length}</h2>:""
          }
        {contributions.length > 0 ? (
          contributions.map((d, idx) => (
            <div key={idx} className="container bg-white border-2 mb-1 rounded-lg shadow-md flex items-center  w-full ">
              <div className="user ">
                <FaRegUser className=' border-2 border-black text-3xl rounded-full text-black ' />
              </div>
              <div className="comment pl-2  ">
                <h4 className='text-black font-serif'>
                  {d.comment }
                </h4>
                <p className='flex justify-around'>
                <p><span className='mr-1'>at:</span> {d.createdAt.slice(0, 10)}</p>
                <p><span className='mr-1'>rating:</span> {d.rating}</p>
                </p>
               
                <p> Film : {d.movie?.title}</p> 
              </div>
            </div>
          ))
        ) : (
          <div className='sm:min-h-[65vh] sm:min-w-[95vw]  sm:m-4 rounded-lg '>
            <h2 className='text-center text-3xl font-semibold p-1 sm:p-2'>You have Not Made Contributions yet !</h2>
           
            <div className=' min-h-[45vh] max-w-[95vw] grid  sm:grid-cols-12 gap-4 m-1 sm:m-3'>
            <div className=' sm:h-[35vh] sm:w-[15vw]  rounded-full border-2 border-black  m-10 sm:col-span-4'>
              <Rating2/>
            </div>
            <div className=' rounded-lg sm:p-2 sm:col-span-8'>
              <h2 className=' text-md sm:text-5xl sm:font-semibold'>"Looks like you haven't shared your movie thoughts yet! 🤔 Let the world know what you think—your reviews are waiting to be written! 🎥💬"</h2>
              <Link to='/review'> <button className='w-64 h-10 bg-green-500 rounded-lg shadow-md text-white font-semibold m-10'>Start Contributing</button></Link>
            </div>
            </div>
           </div>
        )}  </div>  }
    
   
    <div className="footer bg-[#111111]   text-black ">
    <Footer/>
</div>
</div>
</>
  )
}

export default Account