import React from 'react'
import { ToastContainer, toast } from 'react-toastify';

function DiscussionStart(props) {
  const toggleBtn = ()=>{
    toast.info("Entered into Room")
    props.setpanelOpen(!props.panelOpen)
  }
   
  return (
   <>
   <div className=''>
    <div className='flex justify-center mt-12 '>
    <div className="card flex justify-center items-center text-center h-80 rounded-lg shadow-md  w-80">
   <div className="inner h-full w-full  bg-[#f4f4f4] rounded-lg shadow-md border-2 border-black">
    <h2 className='text-2xl font-semibold pt-2'>Maintain Healthy Chat in Discussion Room</h2>
    <div className='text-md px-2'>
    <h2>Don't Spam</h2>
    <h2>Don't use Foul Lang</h2>
    <h2>Don't share Private Info</h2>
    <h2>Don't Spam</h2>
    <h2>Don't Spam</h2>
    </div>
    <div className=' mt-8'>
    <button
    onClick={toggleBtn}
    className='w-56 h-10 border-2 border-black bg-green-500 rounded-lg shadow-md text-white '>Enter To Discussion Room</button>

    </div>
   </div>
    </div>
    </div>
   </div>
   </>
  )
}

export default DiscussionStart