import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Components/Footer'

function Error() {
  return (
    <>
    <div className=' mt-20 text-white'>
      <h2 className='text-3xl font-serif pb-7 p-3'>It seems you navigated to an <span className='text-red-600'>unknown</span>  route....</h2>
      <h4 className=' bg-yellow-400 pl-8 p-3 text-2xl font-semibold  '>Not a Big Problem to Worry </h4>
     <Link to='/'> <button className='w-52 h-12 rounded-lg shadow-md text-white font-semibold bg-green-500 ml-16 mt-7'>Come Back to Home</button></Link>
     
    </div>
    <hr  className='mt-5 '/>
    <div className='fixed bottom-0 ml-20'>
      <Footer/>
    </div>
    </>
  )
}

export default Error