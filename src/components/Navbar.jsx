import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between px-40 bg-black p-3 w-full sticky top-0 z-10 max-md:px-9 items-center'>
        <div className='logo font-extrabold text-white text-lg'>
            Taskinator
        </div>
        <ul className='flex text-white gap-8 max-md:gap-3'>
            <li>Home</li>
            <li>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
