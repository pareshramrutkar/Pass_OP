import React from 'react'

const Navbar = () => {
  return (
    
    <nav className='bg-slate-800 text-white'>
      <div className='mycontainer flex justify-between items-center px-4 py-7 h-14'>

        <div className='logo font-bold text-xl'>
          <span className='text-green-500'> &lt;</span>
            Pass
          <span className='text-green-500'>OP/&gt;</span>
        </div>
        <ul>
            <li className='flex gap-5'>
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="/about">About</a>
                <a className='hover:font-bold' href="/contact">Contact</a>
            </li>    
        </ul>    
      </div>
    </nav>
  )
}

export default Navbar