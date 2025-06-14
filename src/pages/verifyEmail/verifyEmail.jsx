import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import React from 'react';
import toast from "react-hot-toast";

const VerifyEmail = ({ setAuth , auth }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const token = localStorage.getItem("token");

  const handleVerifyEmail = () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    setLoading(true);
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/verifyEmail`, {
      otp: parseInt(otp)
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res);
      toast.success("Email verified successfully!");
      setAuth(!auth);
      navigate('/');
    }).catch((e) => {
      console.log(e);
      toast.error(e.response?.data?.message || "Failed to verify email. Please try again.");
    }).finally(() => {
      setLoading(false);
    });
  };

  const resendOTP = () => {
    setResending(true);
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/sendOTP`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res);
  
      toast.success("OTP resent successfully!");
    }).catch((e) => {
      console.log(e);
      toast.error("Failed to resend OTP. Please try again.");
    }).finally(() => {
      setResending(false);
    });
  };

  useEffect(() => {
    // Send OTP when component mounts
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/sendOTP`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res);

      toast.success("Verification code sent to your email");
    }).catch((e) => {
      console.log(e);
      toast.error("Failed to send verification code");
    });
    
    // Adding empty dependency array to run only once
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center p-4">

 
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-accent mb-2">Verify Your Email</h1>
          <p className="text-gray-600">
            We've sent a verification code to your email address.
            Please enter it below to complete your registration.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit code"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
              maxLength={6}
            />
          </div>

          <button
            onClick={handleVerifyEmail}
            disabled={loading}
            className="w-full py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium flex justify-center items-center"
          >
            {loading ? (
              <span>Verifying...</span>
            ) : (
              <span>Verify Email</span>
            )}
          </button>

          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Didn't receive the code?{" "}
              <button
                onClick={resendOTP}
                disabled={resending}
                className="text-accent hover:text-accent/80 font-medium"
              >
                {resending ? "Resending..." : "Resend Code"}
              </button>
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-gray-600 hover:text-accent text-sm"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
