import React from "react"
import {Route,Routes} from 'react-router-dom'
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Movies from './Pages/Movies'
import Account from "./Pages/Account"
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import Signup from "./Pages/Signup"
import UserProtectedWrapper from "./Pages/UserProtectedWrapper"
import Logout from "./Pages/Logout"
function App() {
 

  return (
    <>
     <Routes>
     <Route path="/" element={<Home/>}/>
      {/* <Route path="/home" element={<Home/>}/> */}
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path = '/movies' element={<Movies/>}/>
      <Route path = '/about' element={<About/>}/>
     < Route path = '/account' element={<Account/>}/>
     <Route path='/contact' element={<Contact/>}/>
      {/* <Route path="/*" element={<Error/>}/> */}
     <Route path="/home" element ={
      <UserProtectedWrapper>
        <Home/>
      </UserProtectedWrapper>
     }/>
     <Route path='/user/logout'
          element={<UserProtectedWrapper>
            <Logout />
          </UserProtectedWrapper>
          } />

     </Routes>

    </>
  )
}

export default App
