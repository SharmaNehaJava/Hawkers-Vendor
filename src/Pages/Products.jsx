import React from 'react'

const Products = () => {
  return (
    <>
    <div className='h-20  px-4 flex justify-between items-center'>

      <div className='bg-white px-4 py-2 justify-center text-center rounded-md'>
        <h3 className='font-semibold'>Total Products</h3>
        <p className='text-blue-500'>15</p>
      </div>

      <div className='bg-white px-4 py-2 justify-center text-center rounded-md' >
        <h3 className='font-semibold'>Top Selling</h3>
        <p className='text-blue-500'>5</p>
      </div>
      
      <div className='bg-white px-4 py-2 justify-center text-center rounded-md'>
        <h3 className='font-semibold'>Low Stocks</h3>
        <p className='text-red-500'>1</p>
      </div>

      <div className='bg-white px-4 py-2 justify-center text-center rounded-md'>
        <h3 className='font-semibold'>Total Revenue</h3>
        <p className='text-blue-500'>12380</p>
      </div>

    </div>

    <div className='h-3/6 justify-between'>
      <h3>Product List</h3>
      {/* add an option to sort by price, sales .. and search option by name*/}
      <ul className='flex'>
        <li>Name</li>
        <li>Category</li>
        <li>Price</li>
        <li>Stocks</li>
        <li>Sales</li>
        <li>Actions(Edit/Delete)</li>
      </ul>
    </div>

    <div className='h-2/6  flex justify-between'>
      <div className='text-center w-1/2 p-2 bg-white m-2'>
        <h3 className='font-medium'>Sales Overview</h3>
        <div className=' h-5/6'></div>
      </div>
      <div className='text-center w-1/2 p-2 bg-white m-2'>
        <h3  className='font-medium'>Category Distribution</h3>
        <div className=' h-5/6'></div>
      </div>
    </div>
    
    </>
  )
}

export default Products;
