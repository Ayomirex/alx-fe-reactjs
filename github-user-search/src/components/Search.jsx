// src/components/Search.jsx
import { useState } from "react";
import fetchUserData from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username && !location && !minRepos) return;

    try {
      setLoading(true);
      const users = await fetchUserData({ username, location, minRepos });
      setResults(users);
      setError(null);
    } catch (err) {
      setError("Looks like we cant find the user");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="grid gap-4 mb-6">
        <div>
          <label className="block mb-1 font-semibold">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g., Animashaun mistura"
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Nigeria"
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Minimum Repositories</label>
          <input
            type="number"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            placeholder="e.g., 10"
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((user) => (
            <div
              key={user.id}
              className="p-4 border rounded shadow flex items-center space-x-4"
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="text-lg font-bold">{user.login}</h2>
                <p className="text-sm text-gray-600">Location: {user.location || "N/A"}</p>
                <p className="text-sm text-gray-600">Public Repos: {user.public_repos}</p>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}