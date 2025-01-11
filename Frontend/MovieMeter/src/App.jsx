import React from "react"
import {Route,Routes} from 'react-router-dom'
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Error from "./Pages/Error"
import Signup from "./Pages/Signup"
function App() {
 

  return (
    <>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      {/* <Route path="/*" element={<Error/>}/> */}
     </Routes>
    </>
  )
}

export default App
