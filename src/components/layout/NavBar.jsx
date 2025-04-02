import React, { useEffect, useState, useRef } from "react";
import { Bell, Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserAction, logoutUserAction } from "../../redux/actions/userAction";
import { getProducts } from "../../redux/actions/productAction";

const Navbar = ({ isServerDown }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const { isAuthenticated, user } = useSelector((state) => state.loadUser);

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchDropDown, setSearchDropDown] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    dispatch(loadUserAction());
    dispatch(getProducts());
  }, [isAuthenticated, dispatch, isServerDown]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      const filteredResults = products?.content?.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.companyName.toLowerCase().includes(value.toLowerCase()) ||
        product.modelName.toLowerCase().includes(value.toLowerCase()) ||
        product.category.title.toLowerCase().includes(value.toLowerCase()) ||
        product.brand.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredResults || []);
      setSearchDropDown(true);
    } else {
      setSearchResults([]);
      setSearchDropDown(false);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${query}`);
      setSearchDropDown(false);
    }
  };

  const handleClearSearch = () => {
    setQuery("");
    setSearchDropDown(false);
  };

  const handleProductClick = (url) => {
    navigate(`/${url}`);
    setSearchDropDown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`bg-gray-900 fixed left-0 w-full text-white p-4 flex items-center justify-evenly z-50 ${!isServerDown ? "top-0" : "top-10"}`}>
      <div className="text-xl font-bold text-indigo-400 w-60 md:w-1/3 lg:w-1/5 h-10 flex items-center">
        <Link to="/">
          <img
            src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
            className="w-full h-10 object-contain"
            alt="logo"
          />
        </Link>
      </div>

      <div className="relative w-full md:w-1/2 lg:w-1/3 flex items-center justify-between" ref={searchRef}>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="w-full bg-white text-black pl-5 pr-12 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            value={query}
            onChange={handleSearchChange}
            onKeyDown={handleSearchSubmit}
          />
          {query && (
            <X
              onClick={handleClearSearch}
              className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
              size={25}
            />
          )}
          <Search
            onClick={() => query.trim() && navigate(`/search?q=${query}`)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-indigo-500 cursor-pointer transition-colors"
            size={25}
          />
        </div>

        {searchDropDown && searchResults.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-2 z-50 overflow-hidden transition-all duration-300">
            {searchResults.map((product, index) => (
              <button
                key={product.productId}
                onClick={() => handleProductClick(product.urlName)}
                className="block w-full text-left px-4 py-3 text-black hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <span className="font-medium">{product.name}</span>
                <span className="text-sm text-gray-500 ml-2">({product.category.title})</span>
                <span className="text-sm text-gray-500 ml-2">({product.brand.title})</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <Bell className="text-gray-400 hover:text-white cursor-pointer transition-colors" size={20} />
        {isAuthenticated ? (
          <div className="relative" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
            <img
              src={BASE_URL + user?.image || "https://i.pravatar.cc/40?img=5"}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
            />
            {showDropdown && (
              <div className="absolute right-0 w-48 bg-white text-black shadow-lg rounded-lg p-2">
                <p className="px-4 py-2 font-medium">{user?.name}</p>
                <Link to="/user/profile" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Profile</Link>
                {user?.role === "ROLE_ADMIN" && (
                  <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Dashboard</Link>
                )}
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => { dispatch(logoutUserAction()); window.location.reload(); navigate("/"); }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/admin/login" className="text-gray-400 hover:text-white cursor-pointer transition-colors">Login/Signup</Link>

          </>
        )}
        <Link
          to="/submit/proof"
          className="text-gray-400 hover:text-white cursor-pointer transition-colors animate-blink"
        >
          🎉 Claim Your 3-4% Reward Now! 🎉
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
