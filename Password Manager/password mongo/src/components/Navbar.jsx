import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='bg-slate-800 '>
        <div className="mycontainer flex justify-between items-center px-0 md:px-4 h-14 text-white py-4">

        <div className="logo font-bold text-2xl">
          <span className='text-green-600'>&lt;</span>
          Pass
          <span className='text-green-600'>World/&gt;</span>
          </div>
        {/* <ul>
            <li className='flex gap-4'>
                <a className='hover:font-semibold' href="#">Home</a>
                <a className='hover:font-semibold' href="#">About</a>
                <a className='hover:font-semibold' href="#">Contacts</a>
            </li>
        </ul> */}
        <div>
          <button className='bg-slate-600 flex justify-between items-center p-1 rounded-full'>
          <img src="/icons/github.png" alt="Github logo" className='invert w-8 mx-1'/>
          <span className='font-bold mr-2 ml-1'>GitHub</span>
          </button>
        </div>
        </div>

      </nav>
    </div>
  )
}

export default Navbar
