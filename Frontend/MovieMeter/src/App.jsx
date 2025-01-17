import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Movies from './Pages/Movies';
import About from './Pages/About';
import Account from './Pages/Account';
import Contact from './Pages/Contact';
import SingleMovie from './Pages/SingleMovie';
import Logout from './Pages/Logout';
import UserProtectedWrapper from './Pages/UserProtectedWrapper';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/home" element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        } />
        <Route path="/movie/:movieId" element={
          <UserProtectedWrapper>
            <SingleMovie />
          </UserProtectedWrapper>
        } />
        <Route path="/user/logout" element={
          <UserProtectedWrapper>
            <Logout />
          </UserProtectedWrapper>
        } />
      </Routes>
    
  );
}

export default App;
