import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Orders = () => {

  const { products, currency} = useContext(ShopContext)

  return (
    <div className='border-t border-gray-300 pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div className=''>
        {
          products.slice(0,4).map((item,index)=>(
              <div key={index} className='py-4 border-t border-b border-gray-200 text-gray-700 flex flex-col md:flex-row md:justify-between md:items-center gap-4'>
                  <div className='flex items-start gap-6 text-sm'>
                    <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                    <div>
                      <p className='sm:text-base font-medium'>{item.name}</p>
                      <div className='flex items-center gap-3 mt-1.5 text-base text-gray-700'>
                        <p className='text-base'>{currency} {item.price}</p>
                        <p className='text-sm'>Quantity: 1</p>
                        <p className='text-sm'>Size: M</p>
                      </div>
                      <p className='text-sm mt-1.5'>Date : <span className='text-gray-400'>Mon Feb 03 2025</span></p>
                      <p className='text-sm mt-1.5'>Payment : <span className='text-gray-400'>COD</span></p>
                    </div>
                  </div>

                  <div className='sm:w-1/2 flex justify-between'>
                    <div className='flex items-center gap-2'>
                      <p className='w-2 h-2 rounded-full bg-green-400'></p>
                      <p className='text-sm md:text-base'>Order Placed</p>
                    </div>
                    <button className='text-sm font-medium px-3 py-2 border border-gray-300'>Track Order</button>
                  </div>
              </div>
            )
          )
        }
      </div>
    </div>
  )
}

export default Orders