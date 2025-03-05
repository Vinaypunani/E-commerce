import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const {products,search ,showSearch} = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])

  const [category, setCategory] = useState([])
  const [subcategory, setSubcategory] = useState([])
  const [sortBy, setSortBy] = useState('relevent')

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(category.filter((prev)=>prev !== e.target.value))
    }else{
      setCategory([...category, e.target.value])
    }
  }

  const toggleSubcategory = (e) => {
    if(subcategory.includes(e.target.value)){
      setSubcategory(subcategory.filter((prev)=> prev !== e.target.value))
    }else{
      setSubcategory([...subcategory, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = [...products]

    if(showSearch && search){
      productsCopy = productsCopy.filter((item)=> item.name.toLowerCase().includes(search.toLowerCase()))
    }


    if(category.length > 0){
      productsCopy = productsCopy.filter((item) => category.includes(item.category))
    }
    if(subcategory.length > 0){
      productsCopy = productsCopy.filter((item) => subcategory.includes(item.subCategory))
    }
    setFilteredProducts(productsCopy)
  }

  const sortProducts = () => {
    let filteredProductsCopy = [...filteredProducts]

    switch(sortBy){
      case 'low-high':
        setFilteredProducts(filteredProductsCopy.sort((a,b)=>a.price - b.price))
        break;
      case 'high-low':
        setFilteredProducts(filteredProductsCopy.sort((a,b)=>b.price - a.price))
        break;
      default:
        applyFilter()
        break;
    }
  }

  useEffect(()=>{
    applyFilter()
  },[category, subcategory,search,showSearch,products])

  useEffect(()=>{
    sortProducts()
  },[sortBy])

  return (

    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-300'>

      {/* filter options */}
      <div className='min-w-60'>
        <p 
        onClick={() => setShowFilter(!showFilter)}
        className='my-2 text-xl flex items-center cursor-pointer gap-2 uppercase'>Filter
          <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
        </p>

        {/* categories filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
             <p className='mb-3 text-sm font-medium uppercase'>Categories</p>
             <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>

              <p className='flex gap-2 cursor-pointer'> 
                <input 
                onChange={(e)=>toggleCategory(e)}
                className='w-3' id="men" type="checkbox" value={'Men'} />
                <label htmlFor="men">Men</label>
              </p>


              <p className='flex gap-2 cursor-pointer'> 
                <input 
                onChange={(e)=>toggleCategory(e)}
                className='w-3' id="women" type="checkbox" value={'Women'} />
                <label htmlFor="women">Women</label>
              </p>


              <p className='flex gap-2 cursor-pointer'> 
                <input 
                onChange={(e)=>toggleCategory(e)}
                className='w-3' id="kids" type="checkbox" value={'Kids'} />
                <label htmlFor="kids">Kids</label>

              </p>
             </div>
        </div>

        {/* subcategory filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
             <p className='mb-3 text-sm font-medium uppercase'>Type</p>

             <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2 cursor-pointer'> 
                <input 
                onChange={(e) => toggleSubcategory(e)}
                className='w-3' id="topwear" type="checkbox" value={'Topwear'} />
                <label htmlFor="topwear">Topwear</label>
              </p>

              <p className='flex gap-2 cursor-pointer'> 
                <input 
                onChange={(e) => toggleSubcategory(e)}
                className='w-3' id="bottomwear" type="checkbox" value={'Bottomwear'} />
                <label htmlFor="bottomwear">Bottomwear</label>
              </p>

              <p className='flex gap-2 cursor-pointer'> 
                <input 
                onChange={(e) => toggleSubcategory(e)}
                className='w-3' id="winterwear" type="checkbox" value={'Winterwear'} />
                <label htmlFor="winterwear">Winterwear</label>
              </p>
             </div>
        </div>


      </div>

      {/* products */}

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'all'} text2={'collections'} />

          {/* Price Sorting */}
          <select 
            onChange={(e) => setSortBy(e.target.value)}
            className='border-2 border-gray-300 text-sm px-2 outline-none'>
            <option value="relevent">Sort By : Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>

          </select>

        </div>

        {/* products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filteredProducts.map((item,index)=>{
              return(
                <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.images} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Collection