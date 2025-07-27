import React from 'react'
import { CiCirclePlus } from "react-icons/ci"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';


const ManageGallary = () => {
  const navigate = useNavigate();

  const [isEdditing, setIsEditing] = useState(false);
  
  const [items, setItems] = React.useState();
  
  const [itemsLoaded, setitemsLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [loadItems, setLoadItems] = useState(false);
  useEffect(()=>{
    const fetchData = async()=>{
      setitemsLoaded(false);
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/gallery`)
    .then((res)=>{

 
      setItems(res.data);
      setitemsLoaded(true);
      
    }).catch((err)=>{
 
      setitemsLoaded(true);
      toast.error("An error occured whule fetching data");

    })}
    fetchData();

  },[loadItems])
  // Add this function to handle delete
  const handleDelete = (key) => {


    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        try {

          const token = localStorage.getItem('token');
          if (!token) {
            toast.error('Please login to delete items.');
            return;
          }
          axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/gallery/${key}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
    
            toast.success("Item deleted successfully");
            setitemsLoaded(false);
           setModalOpen(false);
           setLoadItems(!loadItems);
            
          })
          .catch((err) => {
            console.error(err);
            toast.error('An error occurred while deleting the item.');
          });
          
        } catch (error) {
          console.error("Error deleting item:", error);
          toast.error("An error occurred while deleting the item.");
          
        }


 
      }
    });
    
   
    // Implement your delete logic here
  }

  const editCaption = () => {
   
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Save it!"
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            toast.error('Please login to edit items.');
            return;
          }
          axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/gallery/${selectedId}`, {description:selectedDescription,
            title:selectedTitle
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {

            toast.success("Item edited successfully");
           setModalOpen(false);
           setLoadItems(!loadItems);
        
            
          })
          .catch((err) => {
            console.error(err);
            toast.error('An error occurred while editing the item.');
          });
          
        } catch (error) {
          console.error("Error editing item:", error);
          toast.error("An error occurred while editing the item.");
          
        }
        
      }
    });
    
  }
  
  const handleView = (image, description, title , id) => {

    
    setSelectedImage(image);
    setSelectedDescription(description);
    setSelectedTitle(title);
    setSelectedId(id);
    setModalOpen(true);
  }
  
  const closeModal = () => {
    setIsEditing(false);
    setModalOpen(false);
    setSelectedImage(null);
    setSelectedDescription("");
    setSelectedTitle("");
    setSelectedId("");


  }


  
  return (
    <div className="w-full min-h-screen relative bg-gray-100 p-6 flex justify-center items-center flex-col">
      {!itemsLoaded && (
        <div className="border-4 my-4 border-b-green-500 h-[100px] w-[100px] rounded-full flex justify-center items-center animate-spin relative">
        </div>
      )}
      
      {/* Image Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 bg-red-500 text-white flex justify-between items-center">
              <h3 className="text-xl font-semibold">Image Preview</h3>
          
            </div>
            <div className="p-4 overflow-auto flex-1">
              <img 
                src={selectedImage} 
                alt="Preview" 
                className="max-w-full h-auto mx-auto"
              />

              <div>
                <h3 className="text-xl font-semibold mt-4">Title</h3>
              </div>
             {!isEdditing && <p className="mt-4 text-gray-700">{selectedTitle}</p>}
             {isEdditing && <textarea className="mt-4 text-gray-700 w-full" value={selectedTitle} onChange={(e) => setSelectedTitle(e.target.value)}></textarea>}
              <div>
                <h3 className="text-xl font-semibold mt-4">Description</h3>
              </div>
             {!isEdditing && <p className="mt-4 text-gray-700">{selectedDescription}</p>}
             {isEdditing && <textarea className="mt-4 text-gray-700 w-full" value={selectedDescription} onChange={(e) => setSelectedDescription(e.target.value)}></textarea>}
            </div>
            <div className="p-4 bg-gray-100 flex justify-end">
            {!isEdditing && <button
                onClick={()=>{setIsEditing(!isEdditing)}}
                className="bg-blue-500 mx-2 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition"
              >
                Edit
              </button>}

              {
                isEdditing && <button  onClick={editCaption} className='bg-blue-500 mx-2 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition'>
               Save Changers
                </button>
              }
              <button
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Item Button */}
      {itemsLoaded && (
        <div>
          <Link to="/admin/addphoto">
            <CiCirclePlus className="text-red-600 text-[50px] fixed right-4 bottom-4 hover:text-red-800 hover:text-[65px] transition-all cursor-pointer " />
          </Link>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-red-500 text-white">
                <tr>
                  <th className="py-3 px-5 text-left">Id</th>
                  <th className="py-3 px-5 text-left">Photo</th>
                  <th className="py-3 px-5 text-left">Description</th>
                  <th className="py-3 px-5 text-left">Title</th>

                  <th className="py-3 px-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-3 px-5">{item.id}</td>
                      <td className="py-3 px-5">
                        <img
                          src={item.imageUrl}
                          alt={item.description}
                          className="w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-80"
                          onClick={() => handleView(item.imageUrl, item.description, item.title, item.id)}
                        />
                      </td>
                      <td className="py-3 px-5">
                        <div className="max-w-xs break-words whitespace-pre-wrap">
                          {item.description}
                        </div>
                      </td>
                      <td className="py-3 px-5">
                        <div className="max-w-xs break-words whitespace-pre-wrap">
                          {item.title}
                        </div>
                      </td>
                      <td className="py-3 px-5 text-center">
                        <div className="flex justify-center gap-3 w-full">
                          {/* View Button */}
                          <button
                            onClick={() => {
                              handleView(item.imageUrl, item.description, item.title, item.id)
                            }}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
                          >
                            View
                          </button>
                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-5 text-gray-500 font-semibold">
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
  )
}

export default ManageGallary
