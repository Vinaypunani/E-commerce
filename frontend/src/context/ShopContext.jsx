import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {

    const currency = '₹'
    const delivery_fee = 40

    const navigate = useNavigate()

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [token, setToken] = useState('')

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Please select a size')
            return
        }

        let cartData = { ...cartItems }

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)

        if(token){
            try {
                await axios.post(backendUrl+'/api/cart/add',{itemId,size},{
                    headers:{
                        token
                    }
                })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = {...cartItems}
        cartData[itemId][size] = quantity
        setCartItems(cartData)

        if(token){
            try {
                await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0
        for (const product in cartItems) {
            for (const size in cartItems[product]) {
                if (cartItems[product][size] > 0) {
                    totalCount += cartItems[product][size]
                }
            }
        }
        return totalCount
    }

    const getCartTotal = () => {

        let total = 0
        for (const product in cartItems) {
            for (const size in cartItems[product]) {
                if (cartItems[product][size] > 0) {
                    const productData = products.find((pro)=>pro._id === product)
                    if(productData){
                        total += productData.price * cartItems[product][size]
                    }
                }
            }
        }
        return total
    }

     const getProductsData = async () =>{
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`)

            if(response.data.success){
                setProducts(response.data.products)
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            toast(error.message)
            console.log(error)
        }
    }  
    
    const getUserCart = async (token) =>{
        try {
            const response = await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}})

            if(response.data.success){
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductsData()
        getUserCart(localStorage.getItem('token'))
    },[token])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
        }
    },[token])


    const value = {
        products,
        currency,
        delivery_fee,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartTotal,
        search,
        showSearch,
        setSearch,
        setShowSearch,
        navigate,
        setToken,
        token,
        backendUrl
    }


    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider