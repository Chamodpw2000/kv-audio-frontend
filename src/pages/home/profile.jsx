import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaUser, FaEdit, FaSave, FaTimes, FaCamera, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';
import mediaUpload from '../../utils/mediaUpload';
import MyFeedbackSlider from '../../components/myFeedbackSwiper';

const Profile = () => {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const formRef = useRef(null);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log("res data", response.data);
      setUser(response.data);
      setFormData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load user data');
      setLoading(false);
      console.error('Error fetching user data:', err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEditToggle = () => {
    if (editMode) {
      // Cancel editing - reset form data to original user data
      setFormData(user);
      setProfileImage(null);
      setImageFile(null);
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
      setImageFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    try {
      setUpdating(true);
      const updatedFormData = { ...formData };
      
      if(imageFile) {
        const photoUrl = await mediaUpload(imageFile);
        updatedFormData.profilePicture = photoUrl;
      }
      
      console.log("formData", updatedFormData);
      // Replace with your actual API endpoint
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/update`, 
        updatedFormData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log("res data", response.data);
            
      // Update the user state with the response data
      setUser(response.data.data);
      // Also update the formData to match
      setFormData(response.data.data);
      // Clear temporary image states
      setProfileImage(null);
      setImageFile(null);
      
      toast.success('Profile updated successfully!');
      setEditMode(false);
      setUpdating(false);
    } catch (err) {
      toast.error('Failed to update profile!');
      setError('Failed to update profile');
      setUpdating(false);
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

  // Save Changes Button with loading state
  const SaveButton = ({ isFormButton = false }) => (
    <button
      type={isFormButton ? "submit" : "button"}
      onClick={!isFormButton ? handleSubmit : undefined}
      disabled={updating}
      className={`flex items-center gap-2 ${updating ? 'bg-[#e09c27]' : 'bg-[#f0ad38] hover:bg-[#e09c27]'} text-white px-4 py-2 rounded-md transition-colors`}
    >
      {updating ? (
        <>
          <FaSpinner className="animate-spin" /> Updating...
        </>
      ) : (
        <>
          <FaSave /> Save Changes
        </>
      )}
    </button>
  );

  // Cancel Button
  const CancelButton = () => (
    <button
      type="button"
      onClick={handleEditToggle}
      disabled={updating}
      className="flex items-center gap-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
    >
      <FaTimes /> Cancel
    </button>
  );

  // Edit Profile Button
  const EditButton = () => (
    <button
      type="button"
      onClick={handleEditToggle}
      className="flex items-center gap-2 bg-[#3674b5] text-white px-4 py-2 rounded-md hover:bg-[#2a5d8f] transition-colors"
    >
      <FaEdit /> Edit Profile
    </button>
  );

  return (
    <div className="mt-[100px] px-4 py-8 max-w-7xl mx-auto">
      <h3 className="text-4xl font-bold text-center  text-accent mb-5">
            Manage your Profile !
          </h3>
      {user && 
      
      
      (<div>
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
                  ) : user.profilePicture ? (
                    <img
                      src={user.profilePicture}
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
              {/* Only show buttons in desktop view */}
              <div className="hidden md:flex gap-4 mt-4">
                {!editMode ? (
                  <EditButton />
                ) : (
                  <>
                    <SaveButton isFormButton={false} />
                    <CancelButton />
                  </>
                )}
              </div>
            </div>
            {/* Right Column - User Details */}
            <div className="md:w-2/3">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
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
                        readOnly
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
             
                {/* Only show in mobile view */}
                <div className="md:hidden flex justify-center mt-6">
                  {!editMode ? (
                    <EditButton />
                  ) : (
                    <div className="flex gap-4">
                      <SaveButton isFormButton={true} />
                      <CancelButton />
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>

</div>
          <div>
          <h3 className="text-4xl font-bold text-center  text-accent my-5">
            Feedbacks Given By You 
          </h3>
            <MyFeedbackSlider/>
          </div>
        </div>

        
      )}
    </div>
  );
};

export default Profile;
