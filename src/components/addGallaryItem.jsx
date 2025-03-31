import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddGallaryItem = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    image: null
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.match('image.*')) {
        setError('Please select an image file (jpg, png, etc)');
        return;
      }
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setFormData({
        ...formData,
        image: file
      });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }
    
    if (!formData.image) {
      setError('Please select an image');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Create form data for file upload
      const data = new FormData();
      data.append('description', formData.description);
      data.append('image', formData.image);
      
      // Replace with your actual API endpoint
      // const response = await axios.post('/api/gallery/add', data);
      
      // Simulate API call for now
     console.log("data is" , formData);
     


      
      // Success! Redirect back to gallery management
      navigate('/admin/gallary');
    } catch (err) {
      console.error('Error adding item:', err);
      setError(err.response?.data?.message || 'Failed to add item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-red-500 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Add New Gallery Item</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
          {/* Error message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <div className="flex-shrink-0">
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="h-40 w-40 object-cover rounded-md border border-gray-300"
                  />
                ) : (
                  <div className="h-40 w-40 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50">
                    <span className="text-gray-500 text-sm">Image preview</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="image"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer transition"
                >
                  Select Image
                </label>
                <p className="mt-2 text-sm text-gray-500">
                  JPG, PNG, GIF up to 5MB
                </p>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter description for this image"
            ></textarea>
          </div>
          
          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/admin/gallary')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Add Item'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGallaryItem;

