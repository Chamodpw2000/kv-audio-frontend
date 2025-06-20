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
      console.log(res.data);
      setitemsLoaded(true);
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-gray-100 p-6 flex justify-center items-center flex-col">
      {!itemsLoaded && (
        <div className="border-4 my-4 border-b-green-500 h-[100px] w-[100px] rounded-full flex justify-center items-center animate-spin relative" />
      )}

      {itemsLoaded && (
        <div>
          {/* Add Item Button */}
          <Link to="/admin/additem">
            <CiCirclePlus className="text-red-600 text-[50px] absolute right-4 bottom-4 hover:text-red-800 hover:text-[65px] transition-all cursor-pointer" />
          </Link>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-red-500 text-white">
                <tr>
                  <th className="py-3 px-5 text-left">Key</th>
                  <th className="py-3 px-5 text-left">Name</th>
                  <th className="py-3 px-5 text-left">Price</th>
                  <th className="py-3 px-5 text-left">Category</th>
                  <th className="py-3 px-5 text-left">Dimensions</th>
                  <th className="py-3 px-5 text-left">Description</th>
                  <th className="py-3 px-5 text-center">Availability</th>
                  <th className="py-3 px-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-5">{item.key}</td>
                      <td className="py-3 px-5">{item.name}</td>
                      <td className="py-3 px-5">${item.price}</td>
                      <td className="py-3 px-5">{item.category}</td>
                      <td className="py-3 px-5">{item.dimentions}</td>
                      <td className="py-3 px-5 max-w-xs">
                        <div className="relative">
                          <p
                            className={`text-sm ${
                              item.showFullDescription ? "" : "line-clamp-5"
                            }`}
                          >
                            {item.description}
                          </p>
                          {item.description.length > 300 && (
                            <button
                              className="text-blue-600 text-xs mt-1 hover:underline"
                              onClick={() => {
                                setItems((prevItems) =>
                                  prevItems.map((i) =>
                                    i._id === item._id
                                      ? {
                                          ...i,
                                          showFullDescription:
                                            !i.showFullDescription,
                                        }
                                      : i
                                  )
                                );
                              }}
                            >
                              {item.showFullDescription
                                ? "Show Less"
                                : "Show More"}
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-5 text-center">
                        <span
                          className={`inline-block min-w-[120px] px-3 py-1 rounded-full text-white text-center ${
                            item.availability ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {item.availability ? "Available" : "Not Available"}
                        </span>
                      </td>
                      <td className="py-3 px-5 flex justify-center gap-3">
                        <button
                          onClick={() =>
                            navigate("/admin/items/edit", { state: item })
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.key)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-5 text-gray-500 font-semibold"
                    >
                      No items available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemsPageAdmin;
