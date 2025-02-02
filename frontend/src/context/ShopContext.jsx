import { createContext, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext()

const ShopContextProvider = ({children}) => {

    const currency = '₹'
    const delivery_fee = 40

    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)

    const value ={
        products,
        currency,
        delivery_fee,
        search,
        showSearch,
        setSearch,
        setShowSearch
    }


    return(
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider