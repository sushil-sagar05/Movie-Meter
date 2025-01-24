import React from 'react';
import { FaRegUser } from "react-icons/fa6";

function DiscussionCard({ message,fullname }) {
  return (
    <div className="container border-2 bg-white mb-1 rounded-lg shadow-md flex items-center h-12 w-full">
      
      <div className="comment pl-2">
        <h4 className='text-black font-serif'>
         {fullname.firstname}: {message}
        </h4>
      </div>
    </div>
  );
}

export default DiscussionCard;