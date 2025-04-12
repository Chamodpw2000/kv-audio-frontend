import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaUser, FaEdit, FaSave, FaTimes, FaCamera } from 'react-icons/fa';

const Profile = () => {
const token = localStorage.getItem('token');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        console.log("res data",response.data);
        
        setUser(response.data);
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load user data');
        setLoading(false);
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  const handleEditToggle = () => {
    if (editMode) {
      // Cancel editing - reset form data to original user data
      setFormData(user);
      setProfileImage(null);
    }
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
      // In a real app, you would handle the file upload here
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await axios.put('/api/users/profile', formData);
      setUser(response.data);
      setEditMode(false);
      setLoading(false);
      // You might want to show a success message here
    } catch (err) {
      setError('Failed to update profile');
      setLoading(false);
      console.error('Error updating profile:', err);
    }
  };

  if (loading && !user) {
    return (
      <div className="mt-[100px] flex justify-center items-center min-h-[50vh]">
        <div className="text-3xl text-[#3674b5]">Loading...</div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="mt-[100px] flex justify-center items-center min-h-[50vh]">
        <div className="text-3xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="mt-[100px] px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-[#3674b5] mb-8">My Profile</h1>
      
      {user && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Profile Image */}
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="relative w-48 h-48 mb-4">
                <div 
                  className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-[#3674b5]"
                  onClick={editMode ? handleImageClick : undefined}
                  style={{ cursor: editMode ? 'pointer' : 'default' }}
                >
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : user.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-gray-400 text-6xl" />
                  )}
                  {editMode && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <FaCamera className="text-white text-3xl" />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>
              
              <div className="flex gap-4 mt-4">
                {!editMode ? (
                  <button
                    onClick={handleEditToggle}
                    className="flex items-center gap-2 bg-[#3674b5] text-white px-4 py-2 rounded-md hover:bg-[#2a5d8f] transition-colors"
                  >
                    <FaEdit /> Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSubmit}
                      className="flex items-center gap-2 bg-[#f0ad38] text-white px-4 py-2 rounded-md hover:bg-[#e09c27] transition-colors"
                    >
                      <FaSave /> Save Changes
                    </button>
                    <button
                      onClick={handleEditToggle}
                      className="flex items-center gap-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Right Column - User Details */}
            <div className="md:w-2/3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">First Name</label>
                    {editMode ? (
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3674b5]"
                      />
                    ) : (
                      <p className="text-gray-800 font-semibold">{user.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                    {editMode ? (
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3674b5]"
                      />
                    ) : (
                      <p className="text-gray-800 font-semibold">{user.lastName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    {editMode ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3674b5]"
                      />
                    ) : (
                      <p className="text-gray-800 font-semibold">{user.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Phone</label>
                    {editMode ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3674b5]"
                      />
                    ) : (
                      <p className="text-gray-800 font-semibold">{user.phone}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Address</label>
                  {editMode ? (
                    <textarea
                      name="address"
                      value={formData.address || ''}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3674b5]"
                    />
                  ) : (
                    <p className="text-gray-800 font-semibold">{user.address}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Role</label>
                  <p className="text-gray-800 font-semibold capitalize">{user.role}</p>
                </div>
                
                {/* Only show in mobile view */}
                <div className="md:hidden flex justify-center mt-6">
                  {!editMode ? (
                    <button
                      type="button"
                      onClick={handleEditToggle}
                      className="flex items-center gap-2 bg-[#3674b5] text-white px-6 py-2 rounded-md hover:bg-[#2a5d8f] transition-colors"
                    >
                      <FaEdit /> Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="flex items-center gap-2 bg-[#f0ad38] text-white px-6 py-2 rounded-md hover:bg-[#e09c27] transition-colors"
                      >
                        <FaSave /> Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={handleEditToggle}
                        className="flex items-center gap-2 bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
                      >
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
