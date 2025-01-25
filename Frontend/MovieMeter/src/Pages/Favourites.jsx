import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
function Favourites() {
  return (
    <div className='bg-[#111111]'>
        <Navbar/>
        <div>
            <h2 className='text-center  text-2xl md:text-4xl w-full border-black  text-red-500 font-semibold border-2 rounded-lg'>Your All Favorite Movie At One Place</h2>
        </div>
        <div className='flex justify-center items-center mt-4'>
            <div className="box h-96  w-80">
                <div className="cover h-64 ">
                    <img 
                    className='h-full rounded-lg'
                    src="https://images-na.ssl-images-amazon.com/images/S/pv-target-images/d677ded0fc3f29ed02a243bdd0087a2c1686ed29ee835b4172bb6c4b4871667a._RI_TTW_.jpg" alt="" />
                </div>
                <div className="content h-24 bg-[#141b23] rounded-lg text-white w-full">
                    <h2 className='ml-3'>Name: Power Rangers</h2>
                    <h2 className='ml-3'>Date Added: 24/1/25</h2>
                    <div className='flex justify-center items-center mt-1'>
                    <button className='w-36 h-10 bg-red-500 rounded-lg shadow-md '>Remove</button>
                    </div>
                    
                </div>
            </div>
        </div>
       <div className='text-white'>
        <Footer/>
       </div>
    </div>

  )
}

export default Favourites