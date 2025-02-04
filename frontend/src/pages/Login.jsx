import React, { useState } from 'react'

const Login = () => {

  const [currentState, setCurrentState] = useState('Login')

  const onSubmitHandler = async (e) =>{
    e.preventDefault()

  }

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
          <input type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />
        )
      }
      <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />

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