import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo-main.png';
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { BiUserCircle } from "react-icons/bi";

const Navbar = () => {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const sessionData = JSON.parse(localStorage.getItem('session'));
    if (sessionData) {
      setUser(sessionData);
    }
  }, []);

  const toggleMenu = () => {
    setisMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/session/logout", {
        method: "POST",
        credentials: "include", // Ensures cookies (session) are sent with the request
      });
  
      if (response.ok) {
        localStorage.removeItem("session"); // Remove session data from localStorage
        alert("Logout Successful");
        window.location.href = "/login"; // Redirect to login page
      } else {
        alert("Logout failed: No active session found");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Server error, try again later");
    }
  };
  

  return (
    <div className="h-16 flex items-center px-6 bg-white fixed top-0 md:flex-row md:justify-between w-full md:px-10 shadow-lg">
      {/* logo */}
      <div className="flex flex-row justify-between gap-2 w-full">
        <div className="w-16">
          <img src={logo} alt="EventSphere" />
        </div>
        <ul className="md:flex space-x-8 items-center hidden">
          <li><Link to="/">Home</Link></li>
          <li><Link to="events">Events</Link></li>
          <li><Link to="about">About</Link></li>

          {user ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="focus:outline-none">
                <BiUserCircle className="h-6 w-6 text-black cursor-pointer" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md">
                  <ul className="py-2 text-black">
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link to="/profile">Profile</Link>
                    </li>
                    {user.isAdmin && (
                      <li className="px-4 py-2 hover:bg-gray-100">
                        <Link to="/manage-users">Manage Users</Link>
                      </li>
                    )}
                    <li 
                      onClick={handleLogout} 
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button className="w-18 rounded-xl h-8 bg-gradient-to-br from-[#FBDA61] to-[#FF5ACD] text-black cursor-pointer">
              <Link to="login">Login</Link>
            </button>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-myblack focus:outline-none">
            {isMenuOpen ? <FaXmark className="h-5 w-5 text-black" /> : <FaBarsStaggered className="h-5 w-5 text-black" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <ul className={isMenuOpen ? "flex flex-col items-end fixed top-16 right-0 w-full pr-10 pb-6 bg-white space-y-4 shadow-lg" : "hidden"}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="events">Events</Link></li>
          <li><Link to="about">About</Link></li>

          {user ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="focus:outline-none flex items-center space-x-2">
                <BiUserCircle className="h-6 w-6 text-black" />
                <span>{user.email}</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md">
                  <ul className="py-2 text-black">
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link to="/profile">Profile</Link>
                    </li>
                    {user.isAdmin && (
                      <li className="px-4 py-2 hover:bg-gray-100">
                        <Link to="/manage-users">Manage Users</Link>
                      </li>
                    )}
                    <li 
                      onClick={handleLogout} 
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button className="w-18 rounded-xl h-8 bg-gradient-to-br from-[#FBDA61] to-[#FF5ACD] text-black cursor-pointer">
              <Link to="login">Login</Link>
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
