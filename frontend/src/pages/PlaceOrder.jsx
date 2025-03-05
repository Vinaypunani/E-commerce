import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'


const PlaceOrder = () => {

  const [paymentMethod, setPaymentMethod] = useState('cod')
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartTotal, delivery_fee, products } = useContext(ShopContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData((data) => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {

      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => (product._id === items)))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartTotal() + delivery_fee
      }

      switch (paymentMethod) {
        // API call for COD
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          
          if (response.data.success) {
            setCartItems({})
            toast.success(response.data.message)
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;
        case 'razorpay':
          toast.warning("online payment not available")
          break;
        case 'stripe':
          toast.warning("online payment not available")
          break;
        default:
          break;
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  return (
    <form
      onSubmit={(e) => onSubmitHandler(e)}
      className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-200'>
      {/* left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'information'} />
        </div>
        <div className='flex gap-3'>
          <input onChange={(e) => { onChangeHandler(e) }} value={formData.firstName} name='firstName' type="text" placeholder='First Name' className='border border-gray-300 placeholder:text-gray-400 px-3.5 py-1.5 w-full' />
          <input onChange={(e) => { onChangeHandler(e) }} value={formData.lastName} name='lastName' type="text" placeholder='Last Name' className='border border-gray-300 placeholder:text-gray-400 px-3.5 py-1.5 w-full' />
        </div>

        <div className='flex gap-3'>
          <input onChange={(e) => { onChangeHandler(e) }} value={formData.email} name='email' type="email" placeholder='Email Address' className='border border-gray-300 placeholder:text-gray-400 px-3.5 py-1.5 w-full' />
        </div>
        <div className='flex gap-3'>
          <input onChange={(e) => { onChangeHandler(e) }} value={formData.street} name='street' type="text" placeholder='Street' className='border border-gray-300 placeholder:text-gray-400 px-3.5 py-1.5 w-full' />
        </div>
        <div className='flex gap-3'>
          <input onChange={(e) => { onChangeHandler(e) }} value={formData.city} name='city' type="text" placeholder='City' className='border border-gray-300 placeholder:text-gray-400 px-3.5 py-1.5 w-full' />
          <input onChange={(e) => { onChangeHandler(e) }} value={formData.state} name='state' type="text" placeholder='State' className='border border-gray-300 placeholder:text-gray-400 px-3.5 py-1.5 w-full' />
        </div>
        <div className='flex gap-3'>
          <input onChange={(e) => { onChangeHandler(e) }} value={formData.zipcode} name='zipcode' type="number" placeholder='Zipcode' className='number-input border border-gray-300 placeholder:text-gray-400 px-3.5 py-1.5 w-full' />
          <input onChange={(e) => { onChangeHandler(e) }} value={formData.country} name='country' type="text" placeholder='Country' className='border border-gray-300 placeholder:text-gray-400 px-3.5 py-1.5 w-full' />
        </div>
        <div className='flex gap-3'>
          <input onChange={(e) => { onChangeHandler(e) }} value={formData.phone} name='phone' type="number" placeholder='Phone' className='number-input border border-gray-300 placeholder:text-gray-400 px-3.5 py-1.5 w-full' />
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
            <div onClick={() => setPaymentMethod('stripe')} className='flex items-center gap-3 border border-gray-300 py-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 rounded-full border border-gray-300 ${paymentMethod === 'stripe' ? 'bg-green-400' : 'bg-gray-2 00'}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => setPaymentMethod('razorpay')} className='flex items-center gap-3 border border-gray-300 py-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 rounded-full border border-gray-300  ${paymentMethod === 'razorpay' ? 'bg-green-400' : 'bg-gray-200'}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setPaymentMethod('cod')} className='flex items-center gap-3 border border-gray-300 py-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 rounded-full border border-gray-300 ${paymentMethod === 'cod' ? 'bg-green-400' : 'bg-gray-200'}`}></p>
              <p className='text-gray-500 font-medium text-sm mx-4 uppercase'>Cash on Delivery</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button
              type='submit'
              className='bg-black text-white px-16 py-3 uppercase text-sm'>place order</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder