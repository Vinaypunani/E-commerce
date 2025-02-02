import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {

    const currency = '₹'
    const delivery_fee = 40

    const navigate = useNavigate()

    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)

    const [cartItems, setCartItems] = useState({})

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
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = {...cartItems}
        cartData[itemId][size] = quantity
        setCartItems(cartData)
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
                    total += productData.price * cartItems[product][size]
                }
            }
        }
        return total
    }

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
        navigate
    }


    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider