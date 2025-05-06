import React from 'react'
import { FaRegUser } from "react-icons/fa6";
function Singlereview({comment,createdAt,rating,username}) {
  return (
    <div className="container border-2  bg-white  rounded-md m-2  flex items-center  w-full p-4 "style={{ overflowX: 'hidden' }}>
        <div className="user ">
          <FaRegUser className=' border-2 border-black text-2xl  rounded-full text-black ' />
          <p>{username}</p>
        </div>
        <div className="comment pl-2   ">
            <h4 className='text-black font-serif'>
                 {comment}
                 <p className='flex justify-evenly items-center'>
                 <p className='text-black'>Rating: {rating}</p>
                 <p className='text-black'>AT: {createdAt.slice(0,10)}</p>
                 </p>
            </h4>
        </div>
    </div>
  )
}

export default Singlereview