import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='h-16 bg-neutral-300 flex flex-row justify-between px-2 items-center'>
      {/* logo */}
      <div></div>
      {/* navigation */}
      <div className='flex flex-row justify-between items-center'>
        <ul>
          <li className=''><Link to="/">Home</Link></li>
          <li className=''><Link to="/events">Events</Link></li>
          <li className=''><Link to="/about">About Us</Link></li>
        </ul>
      </div>
         
    </div>
  )
}

export default Navbar