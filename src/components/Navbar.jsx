import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/greencart_assets/assets';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const { user, setUser, setShowUserLogin, navigate } = useAppContext();

  const logout = async () => {
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img className="h-9" src={assets.logo} alt="logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Product</NavLink>
        <NavLink to="/">Contact</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 opacity-80"
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full -mt-2">
            3
          </button>
        </div>

     {!user ? (<button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm -mt-1">
          Login
        </button>)
        : 
        (
            <div className='relative group'>
                <img src={assets.profile_icon} className='w-10' alt="" />
                <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-50 rounded-md text-sm z-40'>
                    <li onClick={() => navigate("my-orders")} className='p-1.5 pl-3 hover:bg-green-50/10 cursor-pointer'>My Orders</li>
                    <li onClick={logout} className='p-1.5 pl-3 hover:bg-green-50/10 cursor-pointer'>Logout</li>
                </ul>
            </div>
        )
        }

      </div>

      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="sm:hidden"
      >
        <img src={assets.menu_icon} alt="menu" />
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-2 px-5 text-sm md:hidden">
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>
            All Product
          </NavLink>
          {user && (
            <NavLink to="/products" onClick={() => setOpen(false)}>
              My Orders
            </NavLink>
          )}
          <NavLink to="/" onClick={() => setOpen(false)}>
            Contact
          </NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;