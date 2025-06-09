
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaUser, FaEdit, FaSave, FaTimes, FaCamera, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';
import mediaUpload from '../../utils/mediaUpload';
import MyFeedbackSlider from '../../components/myFeedbackSwiper';
import Skeleton from 'react-loading-skeleton';
import FeedbackSlider from '../../components/feedbackSwiper';
import Slider from '../../components/swiper';
const ProfilePage = () => {
    // const token = localStorage.getItem('token');
    //   const [user, setUser] = useState(null);
    //   const [loading, setLoading] = useState(true);
    //   const [updating, setUpdating] = useState(false);
    //   const [error, setError] = useState(null);
    //   const [editMode, setEditMode] = useState(false);
    //   const [formData, setFormData] = useState({});
    //   const [profileImage, setProfileImage] = useState(null);
    //   const fileInputRef = useRef(null);
    //   const [imageFile, setImageFile] = useState(null);
    //   const formRef = useRef(null);
    
    //   const fetchUserData = async () => {
    //     try {
    //       setLoading(true);
    //       // Replace with your actual API endpoint
    //       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users`,
    //         {
    //           headers: { Authorization: `Bearer ${token}` }
    //         }
    //       );
    //       console.log("res data", response.data);
    //       setUser(response.data);
    //       setFormData(response.data);
    //       setLoading(false);
    //     } catch (err) {
    //       setError('Failed to load user data');
    //       setLoading(false);
    //       console.error('Error fetching user data:', err);
    //     }
    //   };
    
    //   useEffect(() => {
    //     fetchUserData();
    //   }, []);
    
    //   const handleEditToggle = () => {
    //     if (editMode) {
    //       // Cancel editing - reset form data to original user data
    //       setFormData(user);
    //       setProfileImage(null);
    //       setImageFile(null);
    //     }
    //     setEditMode(!editMode);
    //   };
    
    //   const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //       ...formData,
    //       [name]: value
    //     });
    //   };
    
    //   const handleImageClick = () => {
    //     fileInputRef.current.click();
    //   };
    
    //   const handleImageChange = (e) => {
    //     if (e.target.files && e.target.files[0]) {
    //       const file = e.target.files[0];
    //       setImageFile(file);
    //       setProfileImage(URL.createObjectURL(file));
    //     }
    //   };
    
    //   const handleSubmit = async (e) => {
    //     if (e) e.preventDefault();
    
    //     try {
    //       setUpdating(true);
    //       const updatedFormData = { ...formData };
    
    //       if (imageFile) {
    //         const photoUrl = await mediaUpload(imageFile);
    //         updatedFormData.profilePicture = photoUrl;
    //       }
    
    //       console.log("formData", updatedFormData);
    //       // Replace with your actual API endpoint
    //       const response = await axios.put(
    //         `${import.meta.env.VITE_BACKEND_URL}/api/users/update`,
    //         updatedFormData,
    //         {
    //           headers: { Authorization: `Bearer ${token}` }
    //         }
    //       );
    //       console.log("res data", response.data);
    
    //       // Update the user state with the response data
    //       setUser(response.data.data);
    //       // Also update the formData to match
    //       setFormData(response.data.data);
    //       // Clear temporary image states
    //       setProfileImage(null);
    //       setImageFile(null);
    
    //       toast.success('Profile updated successfully!');
    //       setEditMode(false);
    //       setUpdating(false);
    //     } catch (err) {
    //       toast.error('Failed to update profile!');
    //       setError('Failed to update profile');
    //       setUpdating(false);
    //       console.error('Error updating profile:', err);
    //     }
    //   };
    
    //   const SaveButton = ({ isFormButton = false }) => (
    //     <button
    //       type={isFormButton ? "submit" : "button"}
    //       onClick={!isFormButton ? handleSubmit : undefined}
    //       disabled={updating}
    //       className={`flex items-center gap-2 ${updating ? 'bg-[#e09c27]' : 'bg-[#f0ad38] hover:bg-[#e09c27]'} text-white px-4 py-2 rounded-md transition-colors`}
    //     >
    //       {updating ? (
    //         <>
    //           <FaSpinner className="animate-spin" /> Updating...
    //         </>
    //       ) : (
    //         <>
    //           <FaSave /> Save Changes
    //         </>
    //       )}
    //     </button>
    //   );
    
    //   const CancelButton = () => (
    //     <button
    //       type="button"
    //       onClick={handleEditToggle}
    //       disabled={updating}
    //       className="flex items-center gap-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
    //     >
    //       <FaTimes /> Cancel
    //     </button>
    //   );
    
    //   // Edit Profile Button
    //   const EditButton = () => (
    //     <button
    //       type="button"
    //       onClick={handleEditToggle}
    //       className="flex items-center gap-2 bg-[#3674b5] text-white px-4 py-2 rounded-md hover:bg-[#2a5d8f] transition-colors"
    //     >
    //       <FaEdit /> Edit Profile
    //     </button>
    //   );
  return (
    // <div className='min-h-screen mt-[100px]  px-4 py-8 mx-auto'>

    //      <h3 className="text-4xl font-bold text-center  text-accent mb-5">
    //     Manage your Profile !
    //   </h3>

    //    <div>
    //         <h3 className="text-4xl font-bold text-center  text-accent my-5">
    //           Feedbacks Given By You
    //         </h3>
   
    //   <div>
    //     <p className='md:text-[60px] text-center text-2xl font-bold text-accent md:pt-10'>Our Products</p>
    //     <Slider />
    //   </div>

        
    //       </div>
       
        
        
    //     </div>


    //  <div>
    //         <h3 className="text-4xl font-bold text-center  text-accent my-5">
    //           Feedbacks Given By You
    //         </h3>
    //         {/* <MyFeedbackSlider /> */}

    //         <FeedbackSlider/>
    //       </div>

    
      <div>
        <p className='md:text-[60px] text-center text-2xl font-bold text-accent md:pt-10'>Our Products</p>
        <Slider />
      </div>
  )
}

export default ProfilePage