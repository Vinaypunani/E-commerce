import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({ category, subCategory }) => {

    const { products } = useContext(ShopContext)
    const [relatedProducts, setRelatedProducts] = useState([])

    const fetchRelatedProducts = () => {
        const productsList = products.filter((item) => item.category === category && item.subCategory === subCategory).slice(0, 5)

        setRelatedProducts(productsList)
    }

    useEffect(() => {
        fetchRelatedProducts()
    }, [category, subCategory,products])

    return (
        <div className='mt-20 text-center'>
            <div className='text-3xl'>
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {relatedProducts.map((item,index) => (
                    <ProductItem key={index} id={item._id} image={item.images} name={item.name} price={item.price} />
                ))}
            </div>
        </div>
    )
}

export default RelatedProducts