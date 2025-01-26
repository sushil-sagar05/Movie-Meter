import React from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
function Likes() {
  return (
    <div>
      <Navbar/>
      <div className='flex justify-center items-center '>
        <div>
        <h3 className='text-4xl font-semibold mt-2'>This is Page is <span className='text-red-500'> UnderConstruction</span></h3>
        <hr className='border-2 border-black' />
      <p className='text-md font-semibold pt-4'>ThankYou For Your Patience</p>
     <Link to='/home'><button className='w-48 h-10 bg-green-500 rounded-lg shadow-lg border-2 border-black text-white m-12'>Go to Home</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Likes