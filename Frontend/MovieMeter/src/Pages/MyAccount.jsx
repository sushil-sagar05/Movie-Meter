import React, { useState,useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
function MyAccount() {
  const [data, setdata] = useState('')
  const token = localStorage.getItem('token')
  const fetchAccount = async ()=>{
    
    const response =  await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`,{
      withCredentials: true,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    })
    setdata(response.data.fullname)
  }
  useEffect(()=>{
fetchAccount()
  })
  const notify = ()=>{
    toast.info("Service Unavailable")
  }
  const notify2 = ()=>{
    toast.success("Logged Out")
  }
  return (
  <><div className='bg-[#111111] text-white h-screen ' style={{ overflowX: 'hidden' }}>
 <div>
 <Navbar/>
 </div>
 <h2 className='text-3xl m-4 font-semibold '>{String(data.firstname+data.lastname)}</h2>
  <div className="box flex justify-center items-center  h-72">
    <div className="innerbox  rounded-lg shadow-md h-full border-2  pl-2 m-2  ">
        <h2 className='text-md font-semibold mt-3'>Show All Your Contributions at one Place</h2>
    <Link to='/account'><button className='bg-green-500 h-10 w-48 mt-3 rounded-lg shadow-md text-white font-medium cursor-pointer hover:bg-green-700 border-2 border-green-500'>contributions</button></Link>
    <hr className='border-1 mt-1 border-white' />
    <h2 className='text-md font-semibold mt-3'>Show All Your Favourite at one Place</h2>
   <Link to='/favourite'><button className='bg-green-500 h-10 w-48 mt-3 rounded-lg shadow-md text-white font-medium cursor-pointer hover:bg-green-700'>Favorites</button></Link> 
    <hr  className='border-1 mt-1 border-white' />
    <h2 className='text-md font-semibold mt-3'>Show All Your Likes at one Place</h2>
    <Link to='/likes'>  <button
    onClick={notify}
    className='bg-green-500 mt-3 h-10 w-48 rounded-lg shadow-md text-white font-medium cursor-pointer hover:bg-green-700'>Likes</button></Link> 
    </div>
  </div>
 <div className='flex justify-center items-center  mt-20'>
{
  token ? <Link to='/user/logout'>
  <button 
 onClick={notify2}
 className='w-48 h-10 rounded-lg  mb-5 text-white bg-red-500 font-medium cursor-pointer hover:bg-red-700'>Log Out</button></Link>
 :<Link to='/user/login'>
 <button 
onClick={notify2}
className='w-48 h-10 rounded-lg  mb-5 text-white bg-red-500 font-medium cursor-pointer hover:bg-red-700'>Log In</button></Link>
}
</div> 

    <Footer/>
    </div>
  </>
  )
}

export default MyAccount