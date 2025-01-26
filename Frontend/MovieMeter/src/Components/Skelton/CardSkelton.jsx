import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'


function CardSkelton() {
  return (
  <div className='h-screen'>
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
  <div className='bg-[#141b23] rounded-lg shadow-md w-80 ml-5 mt-5'>
      {/* Skeleton for Image */}
      <div className="cover rounded-lg h-72 w-80">
        <Skeleton height="100%" width="100%" className="rounded-lg h-full w-full" />
      </div>
        <div className="content h-48">
        <Skeleton height="25%" width="100%" className="rounded-lg h-full w-full mt-2" />
        <Skeleton height="25%" width="100%" className="rounded-lg h-full w-full" />
        
        <Skeleton height="25%" width="50%" className="rounded-lg h-full w-1/2" />
        

        </div>
      
        
    </div>
    </SkeletonTheme>
        </div>
  )
}

export default CardSkelton
