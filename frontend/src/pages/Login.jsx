import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {

  const [currentState, setCurrentState] = useState('Login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {navigate,token,setToken,backendUrl} = useContext(ShopContext)

  const onSubmitHandler = async (e) =>{
    e.preventDefault()
    try {
      if(currentState === 'Login'){
        const response = await axios.post(`${backendUrl}/api/user/login`,{email,password})

        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)

        }
        else{
          toast.error(response.data.message)
        }
      }else{
        const response = await axios.post(`${backendUrl}/api/user/register`,{name,email,password})

        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  useEffect(()=>{
    if(token){
      navigate("/")
    }
  },[token])

  return (
    <form 
    onSubmit={(e)=>onSubmitHandler(e)}
    className='flex flex-col items-center gap-4 w-[90%] mx-auto sm:max-w-96 mt-14 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='hero-text text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-10 bg-gray-800'/>
      </div>

      {
        currentState === 'Login' ? '' :(
          <input type="text" 
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />
        )
      }
      <input type="email" 
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input type="password" 
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot Password?</p>
        {
          currentState === 'Login' ? (
            <p onClick={()=>setCurrentState("Sign Up")} className='cursor-pointer'>Create an account</p>
          ):(
            <p onClick={()=>setCurrentState("Login")} className='cursor-pointer'>Login here</p>
          )
        }
      </div>

      <button 
      type='submit'
      className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login