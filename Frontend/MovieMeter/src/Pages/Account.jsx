import React,{useState,useEffect} from 'react'
import Navbar from '../Components/Navbar'
import { FaRegUser } from "react-icons/fa6";
import axios from 'axios'
import Footer from '../Components/Footer';
function Account() {
 const [contributions, setcontributions] = useState([])
   const [error, setError] = useState(null);
const fetchAllReviews = async()=>{
  try {
    const token = localStorage.getItem('token');
  const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/review/getallreview`,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  console.log(data[0])
  setcontributions(data[0])
  } catch (error) {
    setError('Error fetching data2:', error);
  }
};
  useEffect(()=>{
    fetchAllReviews();
  },[])
 
  return (
    <>
    <div className='bg-[#111111]  w-full'>
        <Navbar/>
        <h2 className='text-white text-4xl font-semibold text-center pb-5 pt-5'>Contributions</h2>
        <hr />
       {
        contributions.map((d)=>{
          return (
            <div className="container border-2 mb-1 rounded-lg shadow-md flex items-center h-16 w-full ">
                <div className="user ">
                  <FaRegUser className=' border-2 text-3xl  rounded-full text-white ' />
                  
                </div>
                <div className="comment pl-2  text-white">
                    <h4 className='text-white'>
                        {d.comment}
                    </h4>
                </div>
            </div>
          )
        })
       }
       
       
        
    </div>
    <div className="footer  bottom-0 w-full bg-white ">
    <Footer/>
</div>
</>
  )
}

export default Account