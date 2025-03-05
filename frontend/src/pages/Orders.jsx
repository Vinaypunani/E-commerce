import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {

  const { currency ,backendUrl,token} = useContext(ShopContext)

  const [orderData, setOrderData] = useState([])

  const loadOrderData = async()=>{
    try {
      if(!token){
        return null
      }

      const response = await axios.post(backendUrl+'/api/order/userorders',{},{headers:{token}})

      if(response.data.success){
        // setOrderData(response.data.orders)
        let allOrdersItem = []
        response.data.orders.map((order)=>{
            order.items.map((item)=>{
              item['status'] = order.status
              item['payment'] = order.payment
              item['paymentMethod'] = order.paymentMethod
              item['date'] = order.date
              allOrdersItem.push(item)
            })
        })

        setOrderData(allOrdersItem.reverse())
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  return (
    <div className='border-t border-gray-300 pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div className=''>
        {
          orderData.map((item,index)=>(
              <div key={index} className='py-4 border-t border-b border-gray-200 text-gray-700 flex flex-col md:flex-row md:justify-between md:items-center gap-4'>
                  <div className='flex items-start gap-6 text-sm'>
                    <img className='w-16 sm:w-20' src={item.images[0]} alt="" />
                    <div>
                      <p className='sm:text-base font-medium'>{item.name}</p>
                      <div className='flex items-center gap-3 mt-1.5 text-base text-gray-700'>
                        <p className='text-base'>{currency} {item.price}</p>
                        <p className='text-sm'>Quantity: {item.quantity}</p>
                        <p className='text-sm'>Size: {item.size}</p>
                      </div>
                      <p className='text-sm mt-1.5'>Date : <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                      <p className='text-sm mt-1.5'>Payment : <span className='text-gray-400'>{item.paymentMethod}</span></p>
                    </div>
                  </div>

                  <div className='sm:w-1/2 flex justify-between'>
                    <div className='flex items-center gap-2'>
                      <p className='w-2 h-2 rounded-full bg-green-400'></p>
                      <p className='text-sm md:text-base'>{item.status}</p>
                    </div>
                    <button onClick={()=>loadOrderData()} className='text-sm font-medium px-3 py-2 border border-gray-300'>Track Order</button>
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