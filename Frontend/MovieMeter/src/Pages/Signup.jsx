import React,{useContext, useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { FcRating } from "react-icons/fc";
import { BiCameraMovie } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { SiWelcometothejungle } from "react-icons/si";
import { UserDataContext } from '../Context/UserDataContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import {BeatLoader} from 'react-spinners'
function Signup() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const{user,setuser} = useContext(UserDataContext)
    const [userData, setuserData] = useState({})
    const[loading,setloading]=useState(false)
    const navigate = useNavigate()

const submitHandler = async (e)=>{
    e.preventDefault();
    setloading(true)
    const newUser ={
      fullname:{
        firstname:firstname,
        lastname:lastname
      },
        email:email,
        password:password
    }
try{
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUser,{
    withCredentials: true,
  })
  if(response.status === 200){
    const data = response.data
    setuser(data.user)
    toast.success("Account Created")
   localStorage.setItem('token',data.token)
    navigate('/home')
  } 
}
catch (error) {
       const  errorData=error.response.data
       const validationError=errorData.errors
       const AlreadyUserError=errorData.message
        if(validationError){
          const firstnameError = validationError.find(err=>err.path==="fullname.firstname");
        if(firstnameError){
          toast.error(firstnameError.msg)
        }
        const emailError = validationError.find(err=>err.path==="email");
        if(emailError){
          toast.error(emailError.msg)
        }
        const passwordError = validationError.find(err=>err.path==="password");
        if(passwordError){
          toast.error(passwordError.msg)
        }
        }else if(AlreadyUserError){
          toast.error(AlreadyUserError)
        }else{
          toast.error("something went wrong, please try again")
        }
      }
      setloading(false)
    setemail('')
    setpassword('')
    setfirstname('')
    setlastname('')
    }
  return (
    <div className='h-screen w-full  items-center  bg-[#4432dc]'>
        <h1 className='flex text-3xl '>
          <FcRating/> <BiCameraMovie/> <CiUser/> <SiWelcometothejungle/>
          </h1>
          <hr className='text-white'/>
        <h2 className='font-bold text-3xl   text-yellow-400 text-left ml-4'>Movie Meter</h2>
        <h2 className='font-bold text-3xl mt-5  text-white text-center'>Welcome </h2>
        <p className='text-white text-md font-serif text-center pt-2'>Dive into the World of Movie Lovers</p>
       <div className='flex justify-center items-center'>
        <div className=' flex mt-7 w-48 rounded-lg  gap-2 bg-white '>
        <Link to='/login'> <button className='bg-white w-24 h-10  rounded-lg shadow-lg border font-semibold  '>Login</button></Link>
      <button className='bg-red-500 w-24 h-10 rounded-lg shadow-lg border font-semibold  '>Sign In</button>
    </div>
    </div>
    <div className='flex justify-center items-center'>
        <div className='bg-white py-1 mt-7 shadow-md rounded-lg h-96 w-80  '>
        <form onSubmit={(e)=>{
            submitHandler(e)
        }}>
            <h3 className='text-xl ml-2 font-semibold '>What's Your name</h3>
           <div className='flex gap-2 mb-5'>
            <input type={firstname}
            onChange={(e)=>{
                setfirstname(e.target.value)
            }}
            className='rounded-md ml-2 border bg-[#f8f9fe] px-2 w-1/2 h-10 text-lg placeholder:text-base'            required-type='text'
            placeholder='First Name min:3'
            />
              <input type={lastname}
              onChange={(e)=>{
                setlastname(e.target.value)
              }}
            className='rounded-md border mr-5 ml-2 bg-[#f8f9fe] px-2 w-1/2 h-10 text-lg placeholder:text-base'            required-type='text'
            placeholder='Last Name min:3'
            />
           </div>
           <h3 className='text-xl ml-2 font-semibold '>What's Your Email</h3>
           <input type={email}
              onChange={(e)=>{
                setemail(e.target.value)
              }}
            className='rounded-md border ml-2 bg-[#f8f9fe] px-2 w-72 h-10 text-lg placeholder:text-base'            required-type='text'
            placeholder='your@your.com'
            />
             <h3 className='text-xl ml-2 font-semibold '>Enter Password</h3>
           <input type={password}
              onChange={(e)=>{
                setpassword(e.target.value)
              }}
        className='rounded-md border ml-2 bg-[#f8f9fe] px-2 w-72 h-10 text-lg placeholder:text-base'            
            placeholder='******'
            />
            <span className='flex h-5 ml-5 mt-3 gap-2'>
            <input type="checkbox" className=''
             />
            <p className='text-sm'>I accept the terms of use & privacy policy</p>
            </span>
            
            <button
            type='submit'
            disabled={loading}
            className={`w-72 h-8 rounded-lg mt-3 ml-4 ${loading?'bg-gray-500':"bg-[#4432dc]"} text-white `}>{loading?<><BeatLoader size={20} color="yellow"/></>:'Register'} </button>
            <h2 className='mt-2 text-center'>Aleary have a Accout?<Link to='/login'><span className='ml-1 text-blue-500'>Login</span></Link></h2>
        </form>
        </div>
        </div>
    </div>
  )
}

export default Signup