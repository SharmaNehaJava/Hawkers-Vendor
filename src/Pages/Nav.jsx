import React from 'react'
import { useState } from 'react'

const Nav = () => {
    const [username, setUsername] = useState("@username");
  return ( 
    <div className='h-12 flex items-center justify-between bg-white px-4'>
      <div className='flex  items-center'>
      <img src="https://img.icons8.com/external-outline-black-m-oki-orlando/32/40C057/external-hawker-retail-outline-outline-black-m-oki-orlando.png" className="h-6" alt="Logo" />
        <img className='h-8 ' src="./logo.png" alt="" />
      </div>
      <div className='flex justify-center items-center mx-4'>
        <div className='h-10 w-10 rounded-full bg-gray-600 mx-2'>
            <img src="" alt="" />    
        </div>
        <div>{username}</div>
      </div>
    </div>
  )
}

export default Nav
