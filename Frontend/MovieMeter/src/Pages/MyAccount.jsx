import React, { useState,useEffect, useContext } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { UserDataContext } from '../Context/UserDataContext'
function MyAccount() {
  const [data, setdata] = useState('')
    const { user } = useContext(UserDataContext);
    const navigate = useNavigate()
    useEffect(() => {
      if (!user ) {
        navigate("/login");
      }
    }, []);
    const userId = user?._id
  const fetchAccount = async ()=>{
    
    const response =  await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`,{
      withCredentials: true,

    })
    setdata(response.data.fullname)
  }
  useEffect(()=>{
fetchAccount()
  })
  const notify = ()=>{
    toast.info("Service Unavailable")
  }
  const notify2= ()=>{
    toast.success("Logged Out")
  }
  return (
  <><div className='bg-[#111111] text-white h-screen ' style={{ overflowX: 'hidden' }}>
 <div>
 <Navbar/>
 </div>
 <div className="heading">
  <h2 className='text-5xl font-semibold m-3'>Hi</h2>
  <h2 className='text-3xl m-4 font-semibold text-yellow-400 '>{String(data.firstname+data.lastname)}</h2>
 </div>
  <div className="box min-h-[25vw] max-w-80 sm:max-w-[100vw] m-3 gap-3 grid sm:grid-cols-12  ">
  <div className='border bg-yellow-900 rounded-lg shadow-md m-0 p-2 sm:col-span-4'>
        <h2 className='text-center text-3xl font-semibold m-2'>Recommondations</h2>
        <div className=" sm:h-[30vh] sm:w-[13vw]  rounded-full bg-white">
        <img 
        className='h-full w-full rounded-full'
        src="https://cdn-icons-png.flaticon.com/512/2297/2297834.png" alt="" />
        </div>
        <h2 className='text-2xl font-medium'>Movies Recommondation as per your intrest</h2>
        <Link to={`/MyAccount/${userId}/recommdations`}><button className='bg-green-500 h-10 w-48 mt-3 rounded-lg shadow-md text-white font-medium cursor-pointer hover:bg-green-700'>See List</button></Link> 
      </div>
      <div className='border bg-yellow-900 rounded-lg shadow-md m-0 p-2 sm:col-span-4'>
        <h2 className='text-center text-3xl font-semibold m-2'>Favourites</h2>
        <div className=" sm:h-[30vh] sm:w-[13vw]  rounded-full bg-white">
        <img 
        className='h-full w-full rounded-full'
        src="https://cdn-icons-png.flaticon.com/512/2297/2297834.png" alt="" />
        </div>
        <h2 className='text-2xl font-medium'>Show All your Favourites at one Place</h2>
        <Link to='/favourite'><button className='bg-green-500 h-10 w-48 mt-3 rounded-lg shadow-md text-white font-medium cursor-pointer hover:bg-green-700'>Favorites</button></Link> 
      </div>
      <div className='border bg-blue-900 rounded-lg shadow-md m-0 p-2 sm:col-span-4'>
        <h2 className='text-center text-3xl font-semibold m-2'>Contribution</h2>
        <div className=" sm:h-[30vh] sm:w-[13vw]  rounded-full bg-white">
        <img 
        className='h-full w-full rounded-full'
        src="https://static.vecteezy.com/system/resources/previews/017/398/636/original/3d-icon-comment-social-media-isolated-png.png" alt="" />
        </div>
        <h2 className='text-2xl font-medium'>Show All Your Contributions at one Place</h2>
        <Link to='/account'><button className='bg-green-500 h-10 w-48 mt-3 rounded-lg shadow-md text-white font-medium cursor-pointer hover:bg-green-700 border-2 border-green-500'>contributions</button></Link>
      </div>
      <div className='border bg-teal-900 rounded-lg shadow-md m-0 p-2 sm:col-span-4'>
        <h2 className='text-center text-3xl font-semibold m-2'>Likes</h2>
        <div className=" sm:h-[30vh] sm:w-[13vw]  rounded-full bg-white">
        <img 
        className='h-full w-full rounded-full'
        src="https://img.freepik.com/premium-photo/likes-icon_630753-5.jpg" alt="" />
        </div>
        <h2 className='text-2xl font-medium'>Show All Your Likes at one Place</h2>
        <Link to='/likes'>  <button
    className='bg-green-500 mt-3 h-10 w-48 rounded-lg shadow-md text-white font-medium cursor-pointer hover:bg-green-700'>Likes</button></Link> 
      </div>
  </div>
 <div className='flex justify-center items-center  mt-20'>
{
  user ? <Link to='/user/logout'>
  <button 
 onClick={notify2}
 className='w-48 h-10 rounded-lg  mb-5 text-white bg-red-500 font-medium cursor-pointer hover:bg-red-700'>Log Out</button></Link>
 :<Link to='/login'>
 <button 
onClick={toast.success('Logged In')}
className='w-48 h-10 rounded-lg  mb-5 text-white bg-red-500 font-medium cursor-pointer hover:bg-red-700'>Log In</button></Link>
}
</div> 

    <Footer/>
    </div>
  </>
  )
}

export default MyAccount