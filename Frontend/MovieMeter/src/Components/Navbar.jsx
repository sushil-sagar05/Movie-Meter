import React, { useContext } from "react";
import { FaRegUser } from "react-icons/fa6";
import Hamburger from "./Hamburger";
import { Link, NavLink } from "react-router-dom";
import { UserDataContext } from "../Context/UserDataContext";

function Navbar() {
 const { user } = useContext(UserDataContext);
  return (
    <nav className="bg-[#4432dc] h-16 border-2 border-pink-400 rounded-lg w-full flex items-center px-6">
      
      <div className="flex-1">
        <Link to="/">
          <h2 className="font-bold text-3xl text-yellow-300">MovieMeter</h2>
        </Link>
      </div>

     
      <div className="hidden md:flex gap-6 text-white font-semibold items-center">
        <NavLink
          to="/movies"
          className={({ isActive }) => `${isActive ? "text-yellow-400" : "text-white"}`}
        >
          Movies
        </NavLink>
        <NavLink
          to="/review"
          className={({ isActive }) => `${isActive ? "text-yellow-400" : "text-white"}`}
        >
          Review
        </NavLink>
        <NavLink
        to='/MyAccount'
        className={({ isActive }) => `${isActive ? "text-yellow-400" : "text-white"}`}
        >
          Account
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => `${isActive ? "text-yellow-400" : "text-white"}`}
        >
          About
        </NavLink>
        {user ? (
          <NavLink
            to="/user/logout"
            className={({ isActive }) => `${isActive ? "text-yellow-400" : "text-white"}`}
          >
            Logout
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) => `${isActive ? "text-yellow-400" : "text-white"}`}
          >
            Login
          </NavLink>
        )}
        
      </div>

      <div className="md:hidden text-white flex gap-3 text-3xl">
      <Link to='/MyAccount'><FaRegUser/></Link>
      <Hamburger />
      </div>
    </nav>
  );
}

export default Navbar;
