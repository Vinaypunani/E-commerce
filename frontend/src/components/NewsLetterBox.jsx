import React from 'react'

const NewsLetterBox = () => {

    const onSubmit = (e) => {
        e.preventDefault();
    }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, hic!
        </p>
        <form 
        onSubmit={(e)=>onSubmit(e)}
        className='w-full sm:w-1/2 flex items-center gap-3 mx-auto mt-6 border border-gray-300 pl-3'>
            <input type="email" placeholder='Enter your email' className='w-full sm:flex-1 outline-none ' required />

            <button type='submit' className='bg-black text-white text-sm py-4 px-10 uppercase'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetterBox