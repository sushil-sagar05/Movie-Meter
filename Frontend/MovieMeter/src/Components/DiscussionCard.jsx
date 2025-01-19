import React from 'react'
import { FaRegUser } from "react-icons/fa6";
function DiscussionCard({message}) {
  return (
    <div className="container border-2  bg-white mb-1 rounded-lg shadow-md flex items-center h-12 w-full ">
           <div className="user ">
             <FaRegUser className=' border-2 border-black text-3xl  rounded-full text-black ' />
             
           </div>
           <div className="comment pl-2  ">
               <h4 className='text-black font-serif'>
                    {message}
               </h4>
           </div>
       </div>
  )
}

export default DiscussionCard