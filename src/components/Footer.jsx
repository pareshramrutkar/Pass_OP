import React from 'react'

const Footer = () => {
  return (
    <>
    <div className='bg-slate-800 flex flex-col items-center justify-center text-white fixed bottom-0 w-full'>

      <div className='font-bold text-2xl'>
          <span className='text-green-500'> &lt;</span>
            Pass
          <span className='text-green-500'>OP/&gt;</span>
        </div>
        
        <div className='flex items-center'>
           created with <img className='w-5 mx-2' src="icons/heart.png" alt="" />  by Paresh.R.A
        </div>
    </div>
      </>
  )
}

export default Footer
