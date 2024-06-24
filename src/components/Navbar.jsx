import React from 'react'
import {Link} from 'react-router-dom'
function Navbar() {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
           <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
            <p className= "rounded-md bg-gray-1100 px-3 py-2 text-sm font-medium text-white">Favorite NPM Packages </p>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
           
          <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Add new Package</Link>
          <Link to="/view" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">View favourites</Link>
            
          </div>
        </div>
      </div>

      
    </nav>
  )
}

export default Navbar
