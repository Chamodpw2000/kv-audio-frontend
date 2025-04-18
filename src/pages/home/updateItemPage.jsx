import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import mediaUpload from '../../utils/mediaUpload';

const UpdateItem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [productKey, setProductKey] = useState(location.state.key);
  const [productName, setProductName] = useState(location.state.name);
  const [productPrice, setProductPrice] = useState(location.state.price);
  const [productCategory, setProductCategory] = useState(location.state.category);
  const [productDimensions, setProductDimensions] = useState(location.state.dimentions);
  const [productDescription, setProductDescription] = useState(location.state.description);
  const [loading, setLoading] = useState(false);
  const [productImages, setProductImages] = useState([]);

  const handleUpdateItem = async () => {
    let updatingImages = location.state.image;
    
    if(productImages.length > 0) {
      const promises = [];
      for (let i = 0; i < productImages.length; i++) {
        console.log(productImages[i]);
        const promise = mediaUpload(productImages[i]);
        promises.push(promise);
      }
      const imageUrls = await Promise.all(promises);
      updatingImages = imageUrls;
    }

    // Basic validation
    if (!productKey || !productName || !productPrice || !productCategory || !productDescription) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to update items.');
      return;
    }

    try {
      setLoading(true);
      const result = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${productKey}`,
        {
          name: productName,
          price: productPrice,
          category: productCategory,
          dimentions: productDimensions,
          description: productDescription,
          image: updatingImages,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      toast.success(result.data.message || 'Product updated successfully');
      navigate('/admin/items');
    } catch (error) {
      console.error(error);
      toast.error('Error updating product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Update Product</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Product Key</label>
            <input
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-100"
              value={productKey}
              type="text"
              placeholder="Product Key"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Product Name</label>
            <input
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
              type="text"
              placeholder="Enter Product Name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Product Price</label>
            <input
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              type="number"
              placeholder="Enter Product Price"
              onChange={(e) => setProductPrice(e.target.value)}
              value={productPrice}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Category</label>
            <select
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={(e) => setProductCategory(e.target.value)}
              value={productCategory}
            >
              <option value="sounds">Sounds</option>
              <option value="lighting">Lighting</option>
              <option value="furniture">Furniture</option>
              <option value="decorations">Decorations</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Dimensions (optional)</label>
            <input
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              type="text"
              placeholder="Enter Product Dimensions"
              onChange={(e) => setProductDimensions(e.target.value)}
              value={productDimensions}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Description</label>
            <textarea
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter Product Description"
              onChange={(e) => setProductDescription(e.target.value)}
              value={productDescription}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Upload New Images</label>
            <input
              className="w-full p-3 border rounded-xl file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              type="file"
              multiple
              onChange={(e) => setProductImages(e.target.files)}
            />
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handleUpdateItem}
            className={`px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Item'}
          </button>
          <button
            onClick={() => navigate('/admin/items')}
            className="px-6 py-3 bg-gray-400 text-white rounded-xl shadow-md hover:bg-gray-500 transition font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateItem;
