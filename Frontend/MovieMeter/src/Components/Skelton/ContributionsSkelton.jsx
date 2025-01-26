import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'
function ContributionsSkelton() {
  return (
     <div  className="container bg-white border-2  rounded-lg shadow-md flex items-center h-16 w-full mb-3 ">
      
              <div className="user ">
                <Skeleton className='  text-3xl rounded-full text-black ' circle={true} height={50} width={50}/>
              </div>
              <div className="comment pl-2 w-full ">
                <h4 className='' >
                  <Skeleton className='text-black font-serif '/>
                </h4>
                <p><Skeleton className='mr-1 '/> </p>
                <p><Skeleton /></p> 
              </div>
             
            </div>
  )
}

export default ContributionsSkelton