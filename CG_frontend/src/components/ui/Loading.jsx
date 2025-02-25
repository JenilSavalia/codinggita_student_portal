import React, { useState, useEffect } from "react";
// import Spinner from "./Spinner";
import { Loader } from "lucide-react";

const Spinner = ({ size = 24, className = "" }) => {
  return (
    <div className="flex justify-center items-center">
      <Loader
        className={`animate-spin ${className}`}
        size={size}
      />
    </div>
  );
};


const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 w-full">
      {isLoading ? (
        <Spinner size={48} className="text-blue-600" />
      ) : (
        // <div className="text-2xl font-semibold">Loading Complete!</div>
        " "
      )}
    </div>
  );
};

export default Loading;