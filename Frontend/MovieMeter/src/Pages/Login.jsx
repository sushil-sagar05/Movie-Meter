import React,{useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { SiWelcometothejungle } from "react-icons/si";
import { FcRating } from "react-icons/fc";
import { BiCameraMovie } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import  {UserDataContext}  from '../../Context/UserContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify';
import {BeatLoader} from 'react-spinners'
function Login() {
  const [email, setemail] = useState('');
      const [password, setpassword] = useState('');
      const {user,setuser} = useContext(UserDataContext);
      const [userData, setuserData] = useState({});
      const[loading,setloading] =useState(false);
      const navigate = useNavigate()


      const submitHandler = async (e)=>{
        e.preventDefault();
        setloading(true);
        const userData ={
            email:email,
            password:password
        }
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userData, {
          withCredentials: true,
        })
        
        if (response.status === 200) {
          const data = response.data
          setuser(data.user)
          toast.success("User Logged In")
          localStorage.setItem('token',data.token)
          navigate('/home')
        }
      } catch (error) {
        
       if ( error.response.data.errors){
      error = error.response.data.errors;
      const emailErrors= error.find(err=>err.path==="email");
      if(emailErrors){
        toast.error(emailErrors.msg)
      }
      const passwordErrors = error.find(err=>err.path==="password");
      if(passwordErrors){
        toast.error(passwordErrors.msg)
      }
    }else if(error.response.data){
      let error2 = error.response.data;
      toast.error(error2.message)
    }
      }
        setloading(false)
        setemail('')
        setpassword('')
    }
  return (
   <div className='h-screen w-full  bg-[#4432dc]'>
   <h1 className='flex text-3xl '>
   <FcRating/> <BiCameraMovie/> <CiUser/> <SiWelcometothejungle/>
   </h1>
   <hr className='text-white'/>
   <h2 className='font-bold text-3xl   text-yellow-400 text-left ml-4'>Movie Meter</h2>
    <h2 className='font-bold text-3xl mt-5  text-white text-center'>Welcome Back</h2>
    <p className='text-white text-md font-serif text-center pt-2'>You need to provide the access details to move in</p>
    <div className='flex justify-center items-center'>
    <div className=' flex items-center  mt-7 w-48 rounded-lg  gap-2 bg-white '>
      <button className='bg-red-500 w-24 h-10  rounded-lg shadow-lg border font-semibold  '>Login</button>
     <Link to='/signup'> <button className='bg-white w-24 h-10 rounded-lg shadow-lg border font-semibold  '>Sign In</button></Link>
    </div>
    </div>
    <div className='flex justify-center items-center'>
    <div className="login p-y-1 h-80 bg-white mt-7 w-80 rounded-lg shadow-lg">
    <form
     onSubmit={(e)=>{
      submitHandler(e)
  }}
    className='ml-2 pt-5'>
        <h3 className='text-xl font-semibold mb-2 ml-2'>What's Your Email id</h3>
        <input type={email}
            onChange={(e)=>{
                setemail(e.target.value)
            }}
        className='rounded- border bg-[#f8f9fe] px-2 w-72 h-10 text-lg placeholder:text-base'
        placeholder='your@your.com'
        />
        <h3 className='text-xl font-semibold mb-2 ml-2 pt-2'>Password</h3>
        <input type={password}
              onChange={(e)=>{
                setpassword(e.target.value)
              }}
        className='rounded- border bg-[#f8f9fe] px-2 w-72 h-10 text-lg placeholder:text-base'
        placeholder='your@your.com'
        />
        <button
        type="submit"
        disabled={loading}
        className={`w-72 h-8 rounded-lg mt-10 ml-2 text-white ${loading ? 'bg-gray-500' : 'bg-[#4432dc]'}`}>
          {loading? <>
          <BeatLoader size={20} color='yellow'/>
          </>
            :"Login" }
          </button>
        <h2 className='mt-2 text-center'>New Here?<Link to='/signup'><span className='ml-1 text-blue-500'>Sign in</span></Link></h2>
    </form>
    </div>
    </div>
    <p className='text-sm ml-6 mt-2 text-white text-center'>By signing in, you agree to our Conditions of Use and Privacy Policy.</p>
   </div>
  )
}

export default Login