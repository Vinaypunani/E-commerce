import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import ProductItem from './ProductItem'
import { ShopContext } from '../context/ShopContext'

const BestSeller = () => {

    const { products } = useContext(ShopContext)

    const [bestSellerProducts, setBestSellerProducts] = useState([])

    useEffect(() => {
        setBestSellerProducts(products.filter(item => item.bestseller).slice(0,10))
    }, [products])

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1='BEST' text2='SELLER' />
                <p className='w-3/4 mx-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
                </p>
            </div>

            {/* Rendering Product Items */}

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestSellerProducts.map((item, index) => {
                        return (
                            <ProductItem key={index} id={item._id} image={item.images} name={item.name} price={item.price} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default BestSeller