import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../src/components/Home";
import Profile from "../src/components/Profile";
import ProfileDetails from "../src/components/ProfileDetails";
import ProfileSettings from "../src/components/ProfileSettings";
import BlogPost from "../src/components/BlogPost";
import Login from "../src/components/Login";
import ProtectedRoute from "../src/components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Protected Profile Route */}
        <Route 
          path="/profile/*" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        >
          {/* Nested routes inside Profile */}
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>

        {/* Dynamic blog route */}
        <Route path="/blog/:id" element={<BlogPost />} />

        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
