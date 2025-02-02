import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <footer>
            <div className='flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 mt-40 text-sm'>

                <div>
                    <img src={assets.logo} alt="logo" className='mb-5 w-32' />
                    <p className='w-full md:2/3 text-gray-600'>

                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum voluptatum expedita praesentium nobis natus cumque consequatur deserunt sint libero porro iure impedit voluptatem, magni necessitatibus cum esse neque doloribus dolores!</p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5 uppercase'>
                        COMPANY
                    </p>
                    <ul className='flex flex-col gap-1 text-gray-600 text-xs'>
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                        <li>Collection</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5 uppercase'>
                        Get In Touch
                    </p>
                    <ul className='flex flex-col gap-1 text-gray-600 text-xs'>
                        <li>+1-234-567-890</li>
                        <li>support@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div className='mt-10'>
                <hr className='border-gray-200' />
                <p className='py-5 text-sm text-center text-black'>
                    &copy; 2025 All Rights Reserved
                </p>
            </div>


        </footer>
    )
}

export default Footer