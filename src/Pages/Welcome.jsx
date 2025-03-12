import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center lg:h-screen bg-gradient-to-b from-green-300 to-green-600 text-white p-6">
      
      {/* Left Section (Text & Features) */}
      <div className="w-full lg:w-1/2 flex flex-col items-center text-center space-y-6 lg:pr-10">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide">
          Welcome to <span className="text-yellow-400">Hawkers</span>
        </h1>
        <p className="text-lg md:text-xl leading-relaxed">
          Empowering local street vendors by bringing their businesses online.
          With <b>Hawkers</b>, you can reach more customers and grow your business effortlessly!
        </p>

        {/* Vendor Information */}
        <div className="bg-white text-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Vendor Features:</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center space-x-2">
              <span className="text-green-500">✔️</span>
              <span>Real-time location tracking for moving vendors.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-green-500">✔️</span>
              <span>Easy product management and order tracking.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-green-500">✔️</span>
              <span>Flexible availability toggle to manage visibility.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-green-500">✔️</span>
              <span>Direct customer-vendor interactions.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-green-500">✔️</span>
              <span>Secure payment and order processing.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center mt-8 lg:mt-0">
        <img
          src="/3.png"
          alt="Welcome to Hawkers"
          className="w-64 h-64 md:w-96 md:h-96 object-cover "
        />
      </div>
    </div>
  );
};

export default Welcome;
