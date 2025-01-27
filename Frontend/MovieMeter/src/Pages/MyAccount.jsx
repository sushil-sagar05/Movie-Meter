import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
function MyAccount() {
  const notify = ()=>{
    toast.info("Service Unavailable")
  }
  const notify2 = ()=>{
    toast.success("Logged Out")
  }
  return (
  <><div className='bg-[#111111] text-white h-screen '>
  <Navbar/>
  <h2 className='text-3xl m-4 font-semibold'>Sushil Sagar</h2>
  <div className="box  h-72">
    <div className="innerbox border-2 border-white rounded-lg shadow-md h-full pl-2 m-2  ">
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
<Link to='/user/logout'>
 <button 
onClick={notify2}
className='w-48 h-10 rounded-lg  mb-5 text-white bg-red-500 font-medium cursor-pointer hover:bg-red-700'>Log Out</button></Link></div> 

    <Footer/>
    </div>
  </>
  )
}

export default MyAccount