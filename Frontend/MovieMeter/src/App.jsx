import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Movies from './Pages/Movies';
import About from './Pages/About';
import Account from './Pages/Account';
import Contact from './Pages/Review';
import SingleMovie from './Pages/SingleMovie';
import Logout from './Pages/Logout';
import UserProtectedWrapper from './Pages/UserProtectedWrapper';
import Discussion from './Pages/Discussion';
import Review from './Pages/Review'
import ReviewCard from './Components/ReviewCard';
import WatchNow from './Pages/WatchNow';
import Error from './Pages/Error';
import WatchList from './Pages/WatchList';
import DiscussionStart from './Components/DiscussionStart';
import ReviewPage2 from './Pages/ReviewPage2';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/review" element={<Review />} />
        <Route path="/watchnow" element={<WatchNow />} />
        <Route path="/watchlist" element={<WatchList/>} />
        <Route path='/*' element={<Error/>}/>
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
        <Route path="/movie/:movieId/review" element={
          <UserProtectedWrapper>
           <ReviewPage2/>
           
          </UserProtectedWrapper>
        } />
        
         <Route path="/review/:movieId" element={
          <UserProtectedWrapper>
           <ReviewCard/>
          </UserProtectedWrapper>
        } />
        {/* discussions/movie/${movieId}/messages */}
         <Route path="/discussion/movie/:movieId" element={
          <UserProtectedWrapper>
            <Discussion/>
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
