import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
    return (
        <div className='flex flex-col sm:flex-row border border-gray-400'>
            {/* hero left */}
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                <div className='text-[#414141]'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 sm:w-11 h-[2px] bg-[#414141]'></p>
                        <p className='uppercase text-sm font-semibold'>Our bestsellers</p>
                    </div>
                    <div>
                        <p className='hero-text text-4xl sm:py-3 lg:text-5xl leading-tight'>Latest Arrivals</p>
                    </div>

                    <Link to={'/collection'} className='text-sm font-bold uppercase flex items-center gap-2'>
                    <p>Shop Now</p>
                    <p className='w-8 sm:w-11 h-[1px] bg-[#414141]'></p>
                    </Link>
                </div>
            </div>
            {/* hero right */}

            <img src={assets.hero_img} alt="hero" 
            className='w-full sm:w-1/2 object-cover'
            />
        </div>
    )
}

export default Hero