import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { PropagateLoader } from 'react-spinners'

const List = ({token}) => {

  const [list,setList] = useState([])
  const [loading, setLoading] = useState(false)

  const currency = '₹'

  const fetchList = async () =>{
    setLoading(true)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/list`,{
        headers: {
          token: token
        }
      })

      if(response.status ===200){
        setList(response.data.products)
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  const removeProduct = async (id) =>{
    try {
      setLoading(true)

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/product/remove`,{id},{
        headers:{
          token:token
        }
      })

      if(response.status === 200){
        toast.success(response.data.message)
        await fetchList()
      }
      else{
        toast.error(response.data.message)
      }

    } catch (error) {
       console.log(error)
      toast.error(error.message)
    } finally{
      setLoading(false)
      
    }
  }

  useEffect(()=>{
    fetchList()
  },[])

  return !loading ? (
    <>
      <p className='mb-2'>All Products List</p>

      <div className='flex flex-col gap-2'>

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {
          list.map((item,index)=>(
            <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300  text-sm'>
              <img className='w-12' src={item.images[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency+ " " +item.price}</p>
              <p 
              onClick={()=>removeProduct(item._id)}
              className='cursor-pointer text-right md:text-center text-lg'>X</p>
            </div>
          ))
        }

      </div>
    </>
  ) : (
    <div className='flex items-center justify-center w-full h-[80%]'>
          <PropagateLoader color="#ffc6e2" />
        </div>
  )
}

export default List