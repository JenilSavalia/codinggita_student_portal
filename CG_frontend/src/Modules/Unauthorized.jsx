import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 w-full">
      <div className="text-center space-y-8">
        {/* Glitch Effect */}
        <div className="relative">
          <h1 className="text-6xl font-bold text-purple-600 animate-pulse">
            Unauthorized
          </h1>
          <div className="absolute top-0 left-0 w-full text-6xl font-bold text-red-500 opacity-30 animate-glitch1">
            Unauthorized
          </div>
          <div className="absolute top-0 left-0 w-full text-6xl font-bold text-blue-500 opacity-30 animate-glitch2">
            Unauthorized
          </div>
        </div>

        {/* Fun Message */}
        {/* <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-300">
            Oops! Looks like you've ventured into the void
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            The page you're looking for has been sucked into a black hole. 
            Don't worry, we can help you get back to safety!
          </p>
        </div> */}

        {/* Interactive Elements */}
        <div className="space-y-4">
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-purple-600 text-white rounded-full 
                     hover:bg-purple-700 transform hover:scale-105 
                     transition-all duration-300 shadow-lg 
                     hover:shadow-purple-500/50"
          >
            Beam Me Home
          </button>

          {/* Floating Elements */}
          <div className="relative h-32">
            <div className="absolute w-4 h-4 bg-purple-500 rounded-full 
                          animate-float1 top-0 left-1/4"></div>
            <div className="absolute w-3 h-3 bg-blue-500 rounded-full 
                          animate-float2 top-8 left-1/2"></div>
            <div className="absolute w-2 h-2 bg-red-500 rounded-full 
                          animate-float3 top-16 left-3/4"></div>
          </div>
        </div>
      </div>

      {/* Add this to your global CSS or style tag */}
      <style>
        {`
          @keyframes glitch1 {
            0% { transform: none; opacity: 0.3; }
            7% { transform: translate(2px, 3px); opacity: 0.3; }
            10% { transform: none; opacity: 0.3; }
            27% { transform: none; opacity: 0.3; }
            30% { transform: translate(5px, 2px); opacity: 0.3; }
            35% { transform: none; opacity: 0.3; }
            52% { transform: none; opacity: 0.3; }
            55% { transform: translate(5px, 1px); opacity: 0.3; }
            50% { transform: none; opacity: 0.3; }
            72% { transform: none; opacity: 0.3; }
            75% { transform: translate(2px, 6px); opacity: 0.3; }
            80% { transform: none; opacity: 0.3; }
            100% { transform: none; opacity: 0.3; }
          }

          @keyframes glitch2 {
            0% { transform: none; opacity: 0.3; }
            7% { transform: translate(-2px, -3px); opacity: 0.3; }
            10% { transform: none; opacity: 0.3; }
            27% { transform: none; opacity: 0.3; }
            30% { transform: translate(-5px, -2px); opacity: 0.3; }
            35% { transform: none; opacity: 0.3; }
            52% { transform: none; opacity: 0.3; }
            55% { transform: translate(-5px, -1px); opacity: 0.3; }
            50% { transform: none; opacity: 0.3; }
            72% { transform: none; opacity: 0.3; }
            75% { transform: translate(-2px, -6px); opacity: 0.3; }
            80% { transform: none; opacity: 0.3; }
            100% { transform: none; opacity: 0.3; }
          }

          @keyframes float1 {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }

          @keyframes float2 {
            0% { transform: translateY(-20px); }
            50% { transform: translateY(0px); }
            100% { transform: translateY(-20px); }
          }

          @keyframes float3 {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }

          .animate-glitch1 {
            animation: glitch1 2.5s infinite;
          }

          .animate-glitch2 {
            animation: glitch2 2.5s infinite;
          }

          .animate-float1 {
            animation: float1 3s ease-in-out infinite;
          }

          .animate-float2 {
            animation: float2 3.5s ease-in-out infinite;
          }

          .animate-float3 {
            animation: float3 4s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Unauthorized;