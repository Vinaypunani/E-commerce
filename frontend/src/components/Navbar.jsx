import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {


    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

    const [visible, setVisible] = useState(false)

    const [dropdown, setDropdown] = useState(false)

    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
        navigate('/login')
    }

    return (
        <nav className='flex items-center justify-between py-5 font-medium'>
            <Link to={'/'}>
                <img src={assets.logo} alt="logo" className='w-36' />
            </Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink
                    to={'/'}
                    className='flex items-center flex-col gap-1'>
                    <p className='font-medium'>HOME</p>
                    <div className='w-1/2 h-[1px] bg-gray-700 border-none hidden'></div>
                </NavLink>

                <NavLink
                    to={'/collection'}
                    className='flex items-center flex-col gap-1'>
                    <p className='font-medium'>COLLECTION</p>
                    <div className='w-1/2 h-[1px] bg-gray-700 border-none hidden'></div>
                </NavLink>

                <NavLink
                    to={'/about'}
                    className='flex items-center flex-col gap-1'>
                    <p className='font-medium'>ABOUT</p>
                    <div className='w-1/2 h-[1px] bg-gray-700 border-none hidden'></div>
                </NavLink>

                <NavLink
                    to={'/contact'}
                    className='flex items-center flex-col gap-1'>
                    <p className='font-medium'>CONTACT</p>
                    <div className='w-1/2 h-[1px] bg-gray-700 border-none hidden'></div>
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>
                <img
                    onClick={() => {
                        setShowSearch(true)
                        navigate('/collection')
                    }}
                    src={assets.search_icon} alt="search"
                    className='w-5 cursor-pointer'
                />


                <div className='group relative'>
                    <img
                        onClick={() => {token ? null : navigate('/login')
                            setDropdown(!dropdown)
                        }}
                        className='w-5 cursor-pointer' src={assets.profile_icon} alt="profile" />

                    {/* Dropdown Menu  */}

                    {
                        (token && dropdown)  && (
                            <div className={`${dropdown ? 'block' : 'hidden'} absolute dropdown-menu right-0 pt-4`}>
                                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 rounded text-gray-500'>
                                    <p className='cursor-pointer hover:text-black '>My Profile</p>
                                    <p 
                                    onClick={()=> {navigate('/orders')
                                        setDropdown(false)
                                    }}
                                    className='cursor-pointer hover:text-black '>Orders</p>
                                    <p
                                        onClick={() => {logout()
                                            setDropdown(false)
                                        }}
                                        className='cursor-pointer hover:text-black '>Logout</p>
                                </div>
                            </div>
                        )
                    }

                </div>

                <Link to={'/cart'} className='relative'>
                    <img src={assets.cart_icon} alt="cart" className='w-5 cursor-pointer' />

                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center text-[10px] leading-4 bg-black text-white rounded-full'>{getCartCount()}</p>
                </Link>

                <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="menu" className='w-5 cursor-pointer sm:hidden' />
            </div>

            {/* Mobile Menu */}

            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-200 ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)}
                        className={`flex items-center gap-4 p-3 cursor-pointer mb-3`}>
                        <img src={assets.dropdown_icon} alt="close"
                            className='h-4 rotate-180'
                        />
                        <p className='font-medium'>Back</p>
                    </div>

                    <NavLink to={'/'} onClick={() => setVisible(false)} className='py-3 pl-6 border-b border-gray-200'>
                        <p className='font-medium'>HOME</p>
                    </NavLink>
                    <NavLink to={'/collection'} onClick={() => setVisible(false)} className='py-3 pl-6 border-b border-gray-200'>
                        <p className='font-medium'>COLLECTION</p>
                    </NavLink>
                    <NavLink to={'/about'} onClick={() => setVisible(false)} className='py-3 pl-6 border-b border-gray-200'>
                        <p className='font-medium'>ABOUT</p>
                    </NavLink>
                    <NavLink to={'/contact'} onClick={() => setVisible(false)} className='py-3 pl-6 border-b border-gray-200'>
                        <p className='font-medium'>CONTACT</p>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar