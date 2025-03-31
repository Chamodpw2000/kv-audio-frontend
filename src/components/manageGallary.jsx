import React from 'react'
import { CiCirclePlus } from "react-icons/ci"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const ManageGallary = () => {
  const navigate = useNavigate();
  
  const [items, setItems] = React.useState([
    {
      key: "1",
      description: "Description 1 udbvuufhu with a very long text that needs to be wrapped properly",
      image: "https://imgv3.fotor.com/images/blog-cover-image/a-shadow-of-a-boy-carrying-the-camera-with-red-sky-behind.jpg",
    },
    {
      key: "2",
      description: "Description 2 enwifighegrighuhe fuiefhu fwuefhwiufh wiufhw wuehuwihd wedweh dwewehdw eweduwhduw hdwoi hduwhdwe duwehdowehd woied hweo ohwe doiwe",
      image: "https://imgv3.fotor.com/images/blog-cover-image/a-shadow-of-a-boy-carrying-the-camera-with-red-sky-behind.jpg",
    },
    {
      key: "3",
      description: "Description 3 yewduiwegdwuh wuihuiweh fwehewuhef wuehwh euwhfuwifhuwfhuwfhw fwiufhwfuhwfuiw fwuifhuwhfuwf hw fuwf wuif",
      image: "https://imgv3.fotor.com/images/blog-cover-image/a-shadow-of-a-boy-carrying-the-camera-with-red-sky-behind.jpg",
    },
    {
      key: "4", 
      description: "Description 4 nfbfufufufuwqebfwehf wfwfuwfuifuinfuiwfnuef feuiefufewnndndwendewd ewdiejjoiwedioewdioewdwdwd e dewdjewdjewidjew",
      image: "https://imgv3.fotor.com/images/blog-cover-image/a-shadow-of-a-boy-carrying-the-camera-with-red-sky-behind.jpg",
    },
    {
      key: "5",
      description: "Description 5 guwgfweyfgwfw fw fwuediweudhewudheudheudhe duehdwqiuedpqhwuepqhuef fhqweuiiwedhuwedwue dwuiedhuewid",
      image: "https://imgv3.fotor.com/images/blog-cover-image/a-shadow-of-a-boy-carrying-the-camera-with-red-sky-behind.jpg",
    },
    {
        key: "5",
        description: "Description 5 guwgfweyfgwfw fw fwuediweudhewudheudheudhe duehdwqiuedpqhwuepqhuef fhqweuiiwedhuwedwue dwuiedhuewid",
        image: "https://imgv3.fotor.com/images/blog-cover-image/a-shadow-of-a-boy-carrying-the-camera-with-red-sky-behind.jpg",
      },
      {
        key: "5",
        description: "Description 5 guwgfweyfgwfw fw fwuediweudhewudheudheudhe duehdwqiuedpqhwuepqhuef fhqweuiiwedhuwedwue dwuiedhuewid",
        image: "https://imgv3.fotor.com/images/blog-cover-image/a-shadow-of-a-boy-carrying-the-camera-with-red-sky-behind.jpg",
      }
  ]);
  
  const [itemsLoaded, setitemsLoaded] = React.useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState("");
  
  // Add this function to handle delete
  const handleDelete = (key) => {
    console.log("Deleting item with key:", key);
    // Implement your delete logic here
  }
  
  const handleView = (image, description) => {
    setSelectedImage(image);
    setSelectedDescription(description);
    setModalOpen(true);
  }
  
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
    setSelectedDescription("");
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
              <button 
                onClick={closeModal}
                className="text-white hover:text-gray-200 text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="p-4 overflow-auto flex-1">
              <img 
                src={selectedImage} 
                alt="Preview" 
                className="max-w-full h-auto mx-auto"
              />
              <p className="mt-4 text-gray-700">{selectedDescription}</p>
            </div>
            <div className="p-4 bg-gray-100 flex justify-end">
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
                  <th className="py-3 px-5 text-left">Key</th>
                  <th className="py-3 px-5 text-left">Photo</th>
                  <th className="py-3 px-5 text-left">Description</th>
                  <th className="py-3 px-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((item) => (
                    <tr key={item.key} className="border-b hover:bg-gray-50 transition">
                      <td className="py-3 px-5">{item.key}</td>
                      <td className="py-3 px-5">
                        <img
                          src={item.image}
                          alt={item.description}
                          className="w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-80"
                          onClick={() => handleView(item.image, item.description)}
                        />
                      </td>
                      <td className="py-3 px-5">
                        <div className="max-w-xs break-words whitespace-pre-wrap">
                          {item.description}
                        </div>
                      </td>
                      <td className="py-3 px-5 text-center">
                        <div className="flex justify-center gap-3 w-full">
                          {/* View Button */}
                          <button
                            onClick={() => {
                              handleView(item.image, item.description)
                            }}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
                          >
                            View
                          </button>
                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(item.key)}
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
