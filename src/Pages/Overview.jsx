import React from 'react'

const AddItems = () => {
  return (
    <>
    <div className='h-20  px-4 flex justify-between items-center'>

      <div className='bg-white px-4 py-2 justify-center text-center rounded-md'>
        <h3 className='font-semibold'>Total Sales</h3>
        <p className='text-blue-500'>1888888</p>
      </div>

      <div className='bg-white px-4 py-2 justify-center text-center rounded-md' >
        <h3 className='font-semibold'>New Users</h3>
        <p className='text-blue-500'>1555</p>
      </div>
      
      <div className='bg-white px-4 py-2 justify-center text-center rounded-md'>
        <h3 className='font-semibold'>Total Products</h3>
        <p className='text-blue-500'>15</p>
      </div>

      {/* <div className='bg-white px-4 py-2 justify-center text-center rounded-md'>
        <h3 className='font-semibold'>Conversion rates</h3>
        <p className='text-blue-500'>123</p>
      </div> */}

    </div>

    <div className='h-3/6  flex justify-between'>
      <div className='text-center w-1/2 p-2 bg-white m-2'>
        <h3 className='font-medium'>Sales Overview</h3>
        <div className=' h-5/6'></div>
      </div>
      <div className='text-center w-1/2 p-2 bg-white m-2'>
        <h3  className='font-medium'>Category Distribution</h3>
        <div className=' h-5/6'></div>
      </div>
    </div>

    <div className='text-center h-2/6 p-2 bg-white m-2'>
      <h3  className='font-medium'>Sales By Channel</h3>
      <div className='h-5/6'></div>
    </div>
    
    </>
  )
}

export default AddItems
