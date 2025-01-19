import React,{useState,useEffect} from 'react'
import Navbar from '../Components/Navbar'
import { FaRegUser } from "react-icons/fa6";
import axios from 'axios'
import Footer from '../Components/Footer';
function Account() {
 const [contributions, setcontributions] = useState([])
   const [error, setError] = useState('');
const fetchAllReviews = async()=>{
  try {
    const token = localStorage.getItem('token');
  const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/review/getallreview`,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  // console.log(data[0])
  setcontributions(data)
  } catch (error) {
    setError('Error fetching data2:', error);
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
        {contributions.length > 0 ? (
          contributions.map((d, idx) => (
            <div key={idx} className="container bg-white border-2 mb-1 rounded-lg shadow-md flex items-center h-16 w-full ">
              <div className="user ">
                <FaRegUser className=' border-2 border-black text-3xl rounded-full text-black ' />
              </div>
              <div className="comment pl-2  ">
                <h4 className='text-black font-serif'>
                  {d.comment}
                </h4>
                <p><span className='mr-1'>at:</span> {d.createdAt.slice(0, 10)}</p>
                <p>{d.movie?.title}</p> {/* Display movie title if available */}
              </div>
            </div>
          ))
        ) : (
          <p>You haven't made any contributions yet.</p>
        )}
       
       
        
    </div>
    <div className="footer  bottom-0 w-full bg-white ">
    <Footer/>
</div>
</>
  )
}

export default Account