import React from 'react'
import { FaRegUser } from "react-icons/fa6";
import data from '../data.json'
function Community() {
   
  return (
   [
    data.map((data)=>(
        <div className='h-44 rounded-lg shadow-md w-80 bg-white mt-8 ml-6'>
        <div className="content h-24 flex pt-5 pl-3">
          <div className="user h-1/2 text-7xl"><FaRegUser /></div>
          <div className="name h-1/2 text-2xl">
            <div className="namee">{data.name}</div>
            <div className="pesa">Blogger</div>
          </div>
        </div>
        <div className="message pl-3">
          <h2>{data.comment}</h2>
          ⭐⭐⭐⭐⭐
        </div>
      </div>
    ))
]
  )
}

export default Community