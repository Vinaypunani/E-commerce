import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
        <div className='border-t border-gray-300 text-2xl text-center pt-10'>
          <Title text1={'CONTACT'} text2={'Us'} />
        </div>
        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
          <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
          <div className='flex flex-col justify-center items-start gap-6 text-gray-500 text-sm'>
            <p className='text-xl font-semibold text-gray-600'>Our Store</p>
            <p>54709 Willms Station <br />
            Suite 350, Washington, USA</p>
            <p>Tel: (415) 555-0132 <br />
            Email: admin@forever.com</p>
            <p className='text-xl font-semibold text-gray-600'>Careers at Forever</p>
            <p>Learn more about our teams and job openings.</p>
            <button className='border border-black text-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
          </div>
        </div>
        <NewsLetterBox />
    </div>
  )
}

export default Contact