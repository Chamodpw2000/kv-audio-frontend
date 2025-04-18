import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import mediaUpload from '../utils/mediaUpload';

const AddItem = () => {
  const navigate = useNavigate();

  const [productKey, setProductKey] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('sounds');
  const [productDimensions, setProductDimensions] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [productImages, setProductImages] = useState([]);

  const handleAddItem = async () => {
    const promises = [];
    for (let i = 0; i < productImages.length; i++) {
      promises.push(mediaUpload(productImages[i]));
    }

    if (!productKey || !productName || !productPrice || !productCategory || !productDescription) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to add items.');
      return;
    }

    try {
      setLoading(true);
      const imageurls = await Promise.all(promises);
console.log("category", productCategory);

      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/addProduct`,
        {
          key: productKey,
          name: productName,
          price: productPrice,
          category: productCategory,
          dimentions: productDimensions,
          description: productDescription,
          image: imageurls,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(result.data.message);
      setProductKey('');
      setProductName('');
      setProductPrice('');
      setProductCategory('sounds');
      setProductDimensions('');
      setProductDescription('');
      setProductImages([]);

      navigate('/admin/items');
    } catch (error) {
      console.error(error);
      toast.error('Error adding product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Add New Product</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Product Key</label>
            <input
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={(e) => setProductKey(e.target.value)}
              value={productKey}
              type="text"
              placeholder="Enter Product Key"
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
            <label className="block text-sm font-semibold text-gray-700">Upload Images</label>
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
            onClick={handleAddItem}
            className={`px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Item'}
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

export default AddItem;