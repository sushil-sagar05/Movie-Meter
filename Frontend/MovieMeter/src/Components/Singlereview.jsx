import React from 'react'
import { FaRegUser } from "react-icons/fa6";
function Singlereview({comment},{username}) {
  return (
    <div className="container border-2  bg-white mb-1 rounded-lg shadow-md flex items-center h-16 w-full ">
        <div className="user ">
          <FaRegUser className=' border-2 border-black text-3xl  rounded-full text-black ' />
          
        </div>
        <div className="comment pl-2  ">
            <h4 className='text-black font-serif'>
                 {comment}
                 <p className='text-black'>{username}</p>
            </h4>
           
        </div>
    </div>
  )
}

export default Singlereview