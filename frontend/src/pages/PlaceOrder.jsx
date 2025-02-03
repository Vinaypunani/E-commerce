import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'


const PlaceOrder = () => {

  const [paymentMethod, setPaymentMethod] = useState('cod')

  const {navigate} = useContext(ShopContext)

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-200'>
      {/* left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'information'} />
        </div>
        <div className='flex gap-3'>
          <input type="text" placeholder='First Name' className='border border-gray-300 placeholder:text-gray-400 px-3.5 py-1.5 w-full' />
          <input type="text" placeholder='Last Name' className='border border-gray-300 placeholder:text-gray-400 px-3.5 py-1.5 w-full' />
        </div>
        
        <div className='flex gap-3'>
          <input type="email" placeholder='Email Address' className='border border-gray-300 placeholder:text-gray-400 px-3.5 py-1.5 w-full' />
        </div>
        <div className='flex gap-3'>
          <input type="text" placeholder='Street' className='border border-gray-300 placeholder:text-gray-400 px-3.5 py-1.5 w-full' />
        </div>
        <div className='flex gap-3'>
          <input type="text" placeholder='City' className='border border-gray-300 placeholder:text-gray-400 px-3.5 py-1.5 w-full' />
          <input type="text" placeholder='State' className='border border-gray-300 placeholder:text-gray-400 px-3.5 py-1.5 w-full' />
        </div>
        <div className='flex gap-3'>
          <input type="number" placeholder='Zipcode' className='number-input border border-gray-300 placeholder:text-gray-400 px-3.5 py-1.5 w-full' />
          <input type="text" placeholder='Country' className='border border-gray-300 placeholder:text-gray-400 px-3.5 py-1.5 w-full' />
        </div>
        <div className='flex gap-3'>
          <input type="number" placeholder='Phone' className='number-input border border-gray-300 placeholder:text-gray-400 px-3.5 py-1.5 w-full' />
        </div>

      </div>

      {/* right side */}
      <div className='mt-8'>
        <div className='mt-8 sm:min-w-[350px]'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'Payment'} text2={'Method'} />

          {/* payment method */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setPaymentMethod('stripe')} className='flex items-center gap-3 border border-gray-300 py-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 rounded-full border border-gray-300 ${paymentMethod === 'stripe' ? 'bg-green-400' : 'bg-gray-2 00'}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={()=>setPaymentMethod('razorpay')} className='flex items-center gap-3 border border-gray-300 py-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 rounded-full border border-gray-300  ${paymentMethod === 'razorpay' ? 'bg-green-400' : 'bg-gray-200'}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={()=>setPaymentMethod('cod')} className='flex items-center gap-3 border border-gray-300 py-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 rounded-full border border-gray-300 ${paymentMethod === 'cod' ? 'bg-green-400' : 'bg-gray-200'}`}></p>
              <p className='text-gray-500 font-medium text-sm mx-4 uppercase'>Cash on Delivery</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button 
            onClick={()=>navigate('/orders')}
            className='bg-black text-white px-16 py-3 uppercase text-sm'>place order</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder