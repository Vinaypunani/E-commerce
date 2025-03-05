import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { assets } from '../assets/assets'
import { PropagateLoader } from 'react-spinners'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  const currency = '₹'

  const fetchAllOrders = async () => {
    try {
      setLoading(true)
      if (!token) {
        return null
      }

      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/order/list', {}, { headers: { token } })

      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const status = e.target.value
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/order/status', { orderId, status }, { headers: { token } })
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return !loading ? (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-center border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
              <img className='w-12' src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {
                    order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return <p className='py-0.5 ' key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                      } else {
                        return <p className='py-0.5 ' key={index}>{item.name} x {item.quantity} <span>{item.size}</span>,</p>
                      }
                    })
                  }
                </div>
                <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + "," + order.address.state + ',' + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>

              <div>
                <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                <p className='mt-3'>Method : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? "Done" : "Pendding"}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>{currency} {order.amount}</p>
              <select
                value={order.status}
                onChange={(e) => statusHandler(e, order._id)}
                className='p-2 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  ) : (
    <div className='flex items-center justify-center w-full h-[80%]'>
      <PropagateLoader color="#ffc6e2" />
    </div>
  )
}

export default Orders