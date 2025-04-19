import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { format } from 'date-fns';

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.status !== 200) {
        throw new Error("Failed to fetch feedbacks");
      }
      setFeedbacks(res.data || []);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      setError("Failed to load feedbacks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You are about to approve this feedback.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve it!',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${id}`, {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        if (res.status === 200) {
          setFeedbacks(feedbacks.map(f => f._id === id ? { ...f, isApproves: true } : f));
          Swal.fire('Approved!', 'The feedback has been approved.', 'success');
        }
      } catch (error) {
        console.error("Error approving feedback:", error);
        Swal.fire('Error', 'Failed to approve the feedback.', 'error');
      }
    }
  };

  const handleUnapprove = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You are about to unapprove this feedback.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, unapprove it!',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/reviews/unapprove/${id}`, {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        if (res.status === 200) {
          setFeedbacks(feedbacks.map(f => f._id === id ? { ...f, isApproves: false } : f));
          Swal.fire('Unapproved!', 'The feedback has been unapproved.', 'success');
        }
      } catch (error) {
        console.error("Error unapproving feedback:", error);
        Swal.fire('Error', 'Failed to unapprove the feedback.', 'error');
      }
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        if (res.status === 200) {
          setFeedbacks(feedbacks.filter(f => f._id !== id));
          Swal.fire('Deleted!', 'Feedback has been deleted.', 'success');
        }
      } catch (error) {
        console.error("Error deleting feedback:", error);
        Swal.fire('Error', 'Failed to delete the feedback.', 'error');
      }
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading feedbacks...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Customer Feedbacks</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Item</th>
              <th className="py-3 px-4 text-left">Rating</th>
              <th className="py-3 px-4 text-left">Comment</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {feedbacks.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-4 px-4 text-center text-gray-500">
                  No feedbacks found
                </td>
              </tr>
            ) : (
              feedbacks.map((feedback) => (
                <tr key={feedback._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{feedback.name}</td>
                  <td className="py-3 px-4">{feedback.email}</td>
                  <td className="py-3 px-4">{feedback.itemName}</td>
                  <td className="py-3 px-4">
                    <div className="flex">{renderStars(feedback.rating)}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="max-w-xs overflow-hidden text-ellipsis">
                      {feedback.comment.length > 100 
                        ? `${feedback.comment.substring(0, 100)}...` 
                        : feedback.comment}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {format(new Date(feedback.date), 'MMM dd, yyyy')}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      feedback.isApproves 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {feedback.isApproves ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      {!feedback.isApproves ? (
                        <button
                          onClick={() => handleApprove(feedback._id)}
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                        >
                          Approve
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUnapprove(feedback._id)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs"
                        >
                          Unapprove
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(feedback._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Feedbacks;
