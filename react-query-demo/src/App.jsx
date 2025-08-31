// src/App.jsx
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostsComponent from "../src/components/PostsComponent";

const queryClient = new QueryClient();

export default function App() {
  // Simple toggle to mount/unmount PostsComponent and demonstrate caching
  const [showPosts, setShowPosts] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen p-6">
        <div className="max-w-2xl mx-auto space-y-4">
          <h1 className="text-2xl font-bold">React Query Demo</h1>

          <button
            onClick={() => setShowPosts((s) => !s)}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            {showPosts ? "Hide Posts (navigate away)" : "Show Posts (navigate back)"}
          </button>

          {showPosts ? (
            <PostsComponent />
          ) : (
            <div className="p-4 border rounded">PostsComponent is unmounted.</div>
          )}
        </div>
      </div>
    </QueryClientProvider>
  );
}
