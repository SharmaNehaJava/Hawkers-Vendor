import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../api/apiInstances';

const VendorSignUp = () => {
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isPhoneNumber = (identifier) => /^[0-9]{10}$/.test(identifier);
  const isEmail = (identifier) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

  const handleSendOtp = useCallback(async () => {
    setIsLoading(true);
    try {
      const method = isPhoneNumber(identifier)
        ? 'sms'
        : isEmail(identifier)
        ? 'email'
        : '';

      if (!method) {
        alert('Please enter a valid phone number or email address.');
        setIsLoading(false);
        return;
      }

      const response = await instance.post('/api/vendors/request-otp', {
        identifier,
        method,
        actionType: 'signup', // Specify action type as 'signup'
      });

      setStep(2); // Move to the OTP input step
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [identifier]);

  const handleVerifyOtp = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await instance.post('/api/vendors/verify-otp', {
        identifier,
        otp,
      });

      if (data.verified) {
        // Now create the vendor account
        const createVendorResponse = await instance.post('/api/vendors/create', {
          identifier,
          companyName,
        });
        
        alert('Vendor account created successfully.');
        navigate('/vendor-signin'); // Redirect to vendor sign-in page after account creation
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [identifier, otp, companyName, navigate]);

  return (
    <div className="inset-0 h-screen flex items-center justify-center bg-gray-400 bg-opacity-50 z-50">
      <div className="h-1/2 relative bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <button
          className="w-6 bg-red-500 rounded-full absolute top-2 right-2 text-white hover:text-gray-900"
          onClick={() => navigate('/')}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-4 border-b-2">
          {step === 1 ? 'Vendor Sign Up' : 'Verify OTP'}
        </h2>

        {step === 1 ? (
          <>
            <div className="mb-4">
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
                type="text"
                id="identifier"
                value={identifier}
                placeholder="Phone Number / Email"
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            {isPhoneNumber(identifier) && (
              <div className="mb-4">
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
                  type="text"
                  id="companyName"
                  value={companyName}
                  placeholder="Company Name"
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <button
                type="button"
                className="bg-green-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-green-400"
                onClick={handleSendOtp}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Continue'}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
                Enter OTP
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <button
                type="button"
                className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
                onClick={handleVerifyOtp}
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify & Create Account'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(VendorSignUp);
