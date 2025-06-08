import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../../components/productCard'

const Items = () => {
  const [state, setState] = useState("loading") // loading, success, error
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Define categories
  const categories = ["all", "sounds", "lighting", "furniture", "decorations"]

  useEffect(() => {
    if (state === "loading") {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getProducts`)
        .then((res) => {
          console.log(res.data)
          setProducts(res.data)
          setFilteredProducts(res.data)
          setState("success")
        })
        .catch((err) => {
          console.log(err)
          // Fixed error notification - assuming you're using toast or similar
          console.error(err?.response?.data?.error || "An error occurred")
          setState("error")
        })
    }
  }, [])

  // Filter products based on category and search query
  useEffect(() => {
    if (products.length > 0) {
      let result = [...products]

      // Filter by category if not "all"
      if (activeCategory !== "all") {
        result = result.filter(item =>
          item.category.toLowerCase() === activeCategory.toLowerCase()
        )
      }

      // Filter by search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase()
        result = result.filter(item =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
        )
      }

      setFilteredProducts(result)
    }
  }, [activeCategory, searchQuery, products])

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // Handle category tab change
  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen container  ">
      {/* Search and Filter Section */}
      <div className="w-full max-w-4xl px-4 mt-20 mb-6  ">
        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-3 pl-10 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-colors rounded-full 
                ${activeCategory === category
                  ? 'bg-accent text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Display */}
      <div className='w-full h-full flex flex-wrap p-5 justify-center items-center '>
        {/* Loading State */}
        {state === "loading" && (
          <div className='w-full h-full flex items-center justify-center py-20'>
            <div className='w-[50px] h-[50px] border-4 border-t-4 border-t-blue-600 rounded-full animate-spin'></div>
          </div>
        )}

        {/* Error State */}
        {state === "error" && (
          <div className='w-full flex items-center justify-center py-20'>
            <div className='text-red-500 text-center'>
              <svg className="w-12 h-12 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-lg font-medium">Failed to load products</p>
              <button
                className="mt-4 px-4 py-2  text-white rounded-md "
                onClick={() => setState("loading")}
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Success State - Products */}

        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 '>


          {state === "success" && filteredProducts.length > 0 && (
            filteredProducts.map((item) => (
              <ProductCard item={item} key={item._id} />
            ))
          )}

        </div>

        {/* No Results State */}
        {state === "success" && filteredProducts.length === 0 && (
          <div className='w-full flex items-center justify-center py-20'>
            <div className='text-gray-500 text-center'>
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-lg font-medium">No products found</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Items