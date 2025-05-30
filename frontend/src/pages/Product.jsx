import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {

  const { id } = useParams()
  const { products, currency ,addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === id) {
        setProductData(item)
        setImage(item.images[0])
        return null
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [id, products])


  return productData ? (
    <div className='border-t-2 border-gray-200 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product details */}
      <div className='flex flex-col gap-12 sm:flex-row'>

        {/* product image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row '>

          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.images.map((item, index) => {
              return <img onClick={() => setImage(item)} src={item} alt="" key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
            })}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} alt="" className='w-full h-auto' />
          </div>
        </div>

        {/* product details */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className=' text-gray-500 pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-2xl font-semibold'>{currency} {productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item, index) => {
                  return (
                    <button
                      onClick={() => setSize(item)}
                      className={`border px-4 py-2 bg-gray-100 ${size === item ? 'border-orange-700' : 'border-gray-200'}`} key={index}>{item}</button>
                  )
                })
              }
            </div>
          </div>
          <button 
          onClick={() => addToCart(productData._id,size)}
          className='bg-black text-white text-sm px-7 py-3 uppercase active:bg-gray-700'>Add to Cart</button>

          <hr className='mt-8 sm:w-[4/5] text-gray-200' />

          <div className='text-sm text-gray-500 mt-8 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>

        </div>

      </div>

      {/* product description and reviews */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border border-gray-200 px-5 py-3 text-sm'>Description</b>
          <p className='border border-gray-200 px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border border-gray-200 p-6 text-xs text-gray-500'>
          <p>
            An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
          </p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>

      {/* display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className='opacity-0'></div>
  )
}

export default Product