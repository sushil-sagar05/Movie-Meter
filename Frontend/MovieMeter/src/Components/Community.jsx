import React from 'react'
import { FaRegUser, FaQuoteLeft, FaStar } from "react-icons/fa6";
import data from '../data.json'

function Community() {
  return (
    data.map((testimonial, index) => (
      <div key={index} className="group relative transform hover:scale-105 transition-all duration-300">
        {/* Main card */}
        <div className='relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 hover:border-yellow-500/50 p-6 h-auto min-h-[280px] w-full max-w-sm mx-auto overflow-hidden'>
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-yellow-300/10 rounded-full blur-2xl"></div>
          
          {/* Quote icon */}
          <div className="absolute top-4 right-4 text-yellow-500/30 text-2xl">
            <FaQuoteLeft />
          </div>
          
          {/* User section */}
          <div className="relative z-10 flex items-center mb-6">
            <div className="relative">
              {/* Avatar container with gradient border */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400 p-0.5">
                <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center text-yellow-400 text-2xl">
                  <FaRegUser />
                </div>
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-800"></div>
            </div>
            
            <div className="ml-4 flex-1">
              <h3 className="text-white font-bold text-lg leading-tight">
                {testimonial.name}
              </h3>
              <div className="flex items-center mt-1">
                <span className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-2 py-1 rounded-full text-xs font-semibold">
                  Blogger
                </span>
                <div className="ml-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          
          {/* Comment section */}
          <div className="relative z-10 mb-6">
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-4 italic">
              "{testimonial.comment}"
            </p>
          </div>
          <div className="relative z-10 flex items-center justify-between mt-auto">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className="text-yellow-400 text-lg drop-shadow-sm animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <div className="text-gray-500 text-xs">
              Verified Review
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-yellow-300/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10 transform scale-95"></div>
      </div>
    ))
  )
}

export default Community
