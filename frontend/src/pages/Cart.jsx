import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate,token } = useContext(ShopContext)

  const [cartData, setCartData] = useState([])


  const fetchCart = () =>{
    if (products.length > 0) {
      let tempData = []
      for (const product in cartItems) {
        for (const size in cartItems[product]) {
          if (cartItems[product][size] > 0) {
            tempData.push({
              _id: product,
              size: size,
              quantity: cartItems[product][size],
            })
          }
        }
      }
      setCartData(tempData)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [cartItems, products,token])


  return cartData.length > 0 ? (
    <div className='border-t border-gray-200 pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'Your'} text2={'Cart'} />
      </div>
      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id)
            return (
              <div key={index} className='py-4 border-t border-b border-gray-200 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 '>
                <div className='flex items-center gap-6 '>
                  <img className='w-16 sm:w-20' src={productData.images[0]} alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency} {productData.price}</p>
                      <div className='border px-3 py-1 bg-slate-50 border-gray-200'>
                        {item.size}
                      </div>
                    </div>

                  </div>

                </div>
                <input type="number" min={1}
                  onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                  className='border border-gray-200 max-w-10 sm:max-w-20 px-1 sm:px-2 sm:py-1'
                  value={item.quantity}
                />

                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  src={assets.bin_icon} alt="" className='w-5 cursor-pointer' />
              </div>
            )
          })
        }
      </div>
      <div className='flex justify-end mt-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />

          <div className='w-full text-end my-7'>
            <button onClick={() => navigate('/place-order')} className='cursor-pointer self-end bg-black text-white px-7 text-sm py-3 uppercase'>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='text-center mt-20'>
      <p className='text-2xl'>Your cart is empty</p>
      <p className='text-sm text-gray-500'>Add items to your cart to proceed to checkout</p>

      <p onClick={() => navigate('/collection')} className='bg-black text-white px-7 text-sm py-3 uppercase mt-5 cursor-pointer w-fit mx-auto'>
        Continue Shopping
      </p>
    </div>
  )
}

export default Cart