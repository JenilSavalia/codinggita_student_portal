import React from "react";
import { Navigate } from "react-router-dom";
import { authStore } from "../Stores/store.js";

const ProtectedRoute = ({ children, access }) => {
  const { isAuthenticated, user } = authStore(); // Assuming `userRole` is available in authStore

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/unauthorized" />;
  }

  // Check if the user has the required role
  if (access && user.role !== access) {
    return <Navigate to="/unauthorized" />; // Redirect to unauthorized page
  }

  // Allow access to the protected route
  return children;
};

export default ProtectedRoute;