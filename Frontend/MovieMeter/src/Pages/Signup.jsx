import React,{useContext, useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { FcRating } from "react-icons/fc";
import { BiCameraMovie } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { SiWelcometothejungle } from "react-icons/si";
import { UserDataContext } from '../../Context/UserContext';
import axios from 'axios';
function Signup() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const{user,setuser} = useContext(UserDataContext)
    const [userData, setuserData] = useState({})
    const navigate = useNavigate()

const submitHandler = async (e)=>{
    e.preventDefault();
    const newUser ={
      fullname:{
        firstname:firstname,
        lastname:lastname
      },
        email:email,
        password:password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`,newUser)
    if(response.status===201){
      const data = response.data;
    setuser(data.user)
    localStorage.setItem('token',data.token)
    navigate('/')
    }
    //console.log(userData)
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
        <div className=' flex ml-20 mt-7 w-48 rounded-lg  gap-2 bg-white '>
        <Link to='/login'> <button className='bg-white w-24 h-10  rounded-lg shadow-lg border font-semibold  '>Login</button></Link>
      <button className='bg-red-500 w-24 h-10 rounded-lg shadow-lg border font-semibold  '>Sign In</button>
    </div>
        <div className='bg-white py-1 mt-7 shadow-md rounded-lg h-96 w-80 ml-7 '>
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
            placeholder='First Name'
            />
              <input type={lastname}
              onChange={(e)=>{
                setlastname(e.target.value)
              }}
            className='rounded-md border mr-5 ml-2 bg-[#f8f9fe] px-2 w-1/2 h-10 text-lg placeholder:text-base'            required-type='text'
            placeholder='Last Name'
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
            
            <button className='w-72 h-8 rounded-lg mt-3 ml-4 bg-[#4432dc] text-white '>Register </button>
            <h2 className='mt-2 text-center'>Aleary have a Accout?<Link to='/login'><span className='ml-1 text-blue-500'>Login</span></Link></h2>
        </form>
        </div>
        
    </div>
  )
}

export default Signup