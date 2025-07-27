import React, { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ItemsPageAdmin = () => {
  const [items, setItems] = useState([]);
  const [itemsLoaded, setitemsLoaded] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!itemsLoaded) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getProducts`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const itemsWithToggle = res.data.map((item) => ({
            ...item,
            showFullDescription: false,
          }));
          setItems(itemsWithToggle);
          setitemsLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [itemsLoaded]);

  const handleDelete = async (id) => {
    try {
      setitemsLoaded(false);
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setitemsLoaded(true);
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-2 sm:p-4 lg:p-6 overflow-x-hidden relative">
      {!itemsLoaded && (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="border-4 my-4 border-b-green-500 h-[100px] w-[100px] rounded-full flex justify-center items-center animate-spin relative" />
        </div>
      )}

      {itemsLoaded && (
        <div className="w-full relative">
          {/* Add Item Button - Positioned within screen bounds */}
          <div className="fixed right-2 sm:right-4 bottom-2 sm:bottom-4 z-10">
            <div className="max-w-screen-xl mx-auto relative">
              <Link to="/admin/additem">
                <CiCirclePlus className="text-red-600 text-[40px] sm:text-[50px] hover:text-red-800 hover:text-[50px] sm:hover:text-[65px] transition-all cursor-pointer drop-shadow-lg" />
              </Link>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-4 pb-20">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-md p-4 border"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg text-gray-800 flex-1 pr-2">
                        {item.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs text-white flex-shrink-0 ${
                          item.availability ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {item.availability ? "Available" : "Not Available"}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Key:</span>
                        <p className="text-gray-800 break-words">{item.key}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Price:</span>
                        <p className="text-gray-800">${item.price}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Category:</span>
                        <p className="text-gray-800 break-words">{item.category}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Dimensions:</span>
                        <p className="text-gray-800 break-words">{item.dimentions}</p>
                      </div>
                    </div>

                    <div>
                      <span className="font-medium text-gray-600">Description:</span>
                      <div className="mt-1">
                        <p
                          className={`text-sm text-gray-800 break-words ${
                            item.showFullDescription ? "" : "line-clamp-3"
                          }`}
                        >
                          {item.description}
                        </p>
                        {item.description.length > 150 && (
                          <button
                            className="text-blue-600 text-xs mt-1 hover:underline"
                            onClick={() => {
                              setItems((prevItems) =>
                                prevItems.map((i) =>
                                  i._id === item._id
                                    ? {
                                        ...i,
                                        showFullDescription: !i.showFullDescription,
                                      }
                                    : i
                                )
                              );
                            }}
                          >
                            {item.showFullDescription ? "Show Less" : "Show More"}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() =>
                          navigate("/admin/items/edit", { state: item })
                        }
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md transition text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.key)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 font-semibold bg-white rounded-lg">
                No items available
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block pb-20">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Table Header - Fixed */}
              <div className="bg-red-500 text-white">
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-red-300">
                  <div className="min-w-[1200px]">
                    <div className="grid grid-cols-8 gap-0">
                      <div className="py-3 px-4 text-left font-medium w-[100px]">Key</div>
                      <div className="py-3 px-4 text-left font-medium w-[150px]">Name</div>
                      <div className="py-3 px-4 text-left font-medium w-[80px]">Price</div>
                      <div className="py-3 px-4 text-left font-medium w-[120px]">Category</div>
                      <div className="py-3 px-4 text-left font-medium w-[120px]">Dimensions</div>
                      <div className="py-3 px-4 text-left font-medium w-[300px]">Description</div>
                      <div className="py-3 px-4 text-center font-medium w-[120px]">Availability</div>
                      <div className="py-3 px-4 text-center font-medium w-[180px]">Actions</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Body - Scrollable */}
              <div className="max-h-[70vh] overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                <div className="min-w-[1200px]">
                  {items.length > 0 ? (
                    items.map((item, index) => (
                      <div
                        key={item._id}
                        className={`grid grid-cols-8 gap-0 border-b hover:bg-gray-50 transition ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                      >
                        <div className="py-3 px-4 w-[100px] overflow-hidden">
                          <span className="block truncate" title={item.key}>
                            {item.key}
                          </span>
                        </div>
                        <div className="py-3 px-4 w-[150px] overflow-hidden">
                          <span className="block truncate" title={item.name}>
                            {item.name}
                          </span>
                        </div>
                        <div className="py-3 px-4 w-[80px]">
                          ${item.price}
                        </div>
                        <div className="py-3 px-4 w-[120px] overflow-hidden">
                          <span className="block truncate" title={item.category}>
                            {item.category}
                          </span>
                        </div>
                        <div className="py-3 px-4 w-[120px] overflow-hidden">
                          <span className="block truncate" title={item.dimentions}>
                            {item.dimentions}
                          </span>
                        </div>
                        <div className="py-3 px-4 w-[300px]">
                          <p
                            className={`text-sm break-words ${
                              item.showFullDescription ? "" : "line-clamp-3"
                            }`}
                          >
                            {item.description}
                          </p>
                          {item.description.length > 200 && (
                            <button
                              className="text-blue-600 text-xs mt-1 hover:underline"
                              onClick={() => {
                                setItems((prevItems) =>
                                  prevItems.map((i) =>
                                    i._id === item._id
                                      ? {
                                          ...i,
                                          showFullDescription: !i.showFullDescription,
                                        }
                                      : i
                                  )
                                );
                              }}
                            >
                              {item.showFullDescription ? "Show Less" : "Show More"}
                            </button>
                          )}
                        </div>
                        <div className="py-3 px-4 w-[120px] flex justify-center items-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-white text-xs ${
                              item.availability ? "bg-green-500" : "bg-red-500"
                            }`}
                          >
                            {item.availability ? "Available" : "Not Available"}
                          </span>
                        </div>
                        <div className="py-3 px-4 w-[180px] flex justify-center items-center gap-2">
                          <button
                            onClick={() =>
                              navigate("/admin/items/edit", { state: item })
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.key)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 font-semibold">
                      No items available
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemsPageAdmin;
