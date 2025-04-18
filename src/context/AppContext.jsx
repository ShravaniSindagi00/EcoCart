import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/greencart_assets/assets";
import toast from "react-hot-toast"
export const AppContext = createContext();

export const AppContextProvider = ({children}) =>{
    
    const currency = import.meta.VITE_CURRENCY
    const navigate = useNavigate();
    const [user, setUser] = useState(true)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})
// fetch product
const fetchProducts = async () =>{
    setProducts(dummyProducts)
}

// add product to cart
const addToCart = (itemId) =>{
    let cartData = structuredClone(cartItems);

    if(cartData[itemId]){
        cartData[itemId] +=1;
    }else{
        cartData[itemId] =1;
    }
    setCartItems(cartData)
    toast.success("Added to Cart")
}

// update
const updateCartItem = (itemId, quantity) =>{
let cartData = structuredClone(cartItems)
cartData[itemId] = quantity;
setCartItems(cartData)
toast.success("Cart Updated")
}


// remove 
const removeFromCart = (itemId) =>{
    let cartData = structuredClone(cartItems);
    if(cartData[itemId]){
cartData[itemId] -=1;
if(cartData[itemId] === 0){
    delete cartData[itemId]
}
    }
    toast.success("Removed from cart")
    setCartItems(cartData)
}

// get cart item count
const getCartCount = () => {
    let totalCount = 0;
    for(const item in cartItems){
        totalCount+=cartItems[item];
    }
    return totalCount
}

// total cart amount total
const getCartAmount = () =>{
    let totalAmount = 0;
    for(const items in cartItems){
        let itemInfo = products.find((product) => product._id === items);
        if(cartItems[items] >0) {
            totalAmount += itemInfo.offPrice * cartItems[items]
        }
    } return Math.floor(totalAmount *100) /100;
}



useEffect(() =>{
    fetchProducts()
}, [])

    const value = {navigate, user, setUser, setIsSeller,isSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, cartItems, searchQuery, setSearchQuery, getCartAmount, getCartCount}
 return <AppContext.Provider value={value}>
    {children}
 </AppContext.Provider>
}


export const useAppContext =() =>{
    return useContext(AppContext)
}

