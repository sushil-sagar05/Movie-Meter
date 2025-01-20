import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

function WatchNow() {
  return (
    <div>
      <Navbar/>
     <div className='bg-[#f8f7f5]  mt-16 h-96 w-80 ml-8 rounded-lg  border-2 border-black'>
     <div className='text-center pt-10'>
        <h2 className='text-2xl   font-semibold '>This is service is Currently Unavailable </h2>
       <h2 className='text-md  '>Enter you Email so that we will send you updates when this features comes</h2>
       
        <div className="email mt-4">
          <input type="text " 
          className='w-72 pl-2 rounded-lg shadow-md border-2 border-pink-500 h-32 '
          placeholder='Enter your Email'
          />
        </div>
        <button className='w-48 h-8 mt-4 text-white bg-green-500 rounded-lg shadow-md'>Submit</button>
      </div>
     </div>
      <div className='fixed bottom-0 ml-20'>
      <Footer />
      </div>
    </div>
  )
}

export default WatchNow
