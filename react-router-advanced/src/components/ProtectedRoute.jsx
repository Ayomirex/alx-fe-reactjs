import React from "react";
import { Navigate } from "react-router-dom";

// Simple custom hook to simulate authentication
function useAuth() {
  // You can replace this with real auth logic later
  const isAuthenticated = false;
  return { isAuthenticated };
}

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
