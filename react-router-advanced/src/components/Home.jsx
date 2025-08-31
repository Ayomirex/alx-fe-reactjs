import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/profile/details">Go to Profile Details</Link>
      <br />
      <Link to="/blog/123">Go to Blog Post 123</Link>
    </div>
  );
}
