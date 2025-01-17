import React from 'react'
import { FaRegUser } from "react-icons/fa6";
function Singlereview({comment}) {
  return (
    <div className="container border-2 mb-1 rounded-lg shadow-md flex items-center h-16 w-full ">
        <div className="user ">
          <FaRegUser className=' border-2 text-3xl  rounded-full text-white ' />
          
        </div>
        <div className="comment pl-2  text-white">
            <h4 className='text-white'>
                 {comment}
            </h4>
        </div>
    </div>
  )
}

export default Singlereview