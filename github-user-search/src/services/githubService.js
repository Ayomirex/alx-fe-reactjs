// src/services/githubService.js
import axios from "axios";

export default async function fetchUserData({ username, location, minRepos }) {
  let queryParts = [];


if (username) queryParts.push(`${username} in:login`);
if (location) queryParts.push(`location:${location}`);
if (minRepos) queryParts.push(`repos:>=${minRepos}`);


  const query = queryParts.join(" ");
  const url = https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=10;

  const response = await axios.get(url);

  // GitHub Search API returns limited user data, so we fetch full details
  const detailedUsers = await Promise.all(
    response.data.items.map(async (user) => {
      const userDetails = await axios.get(user.url);
      return userDetails.data;
    })
  );

  return detailedUsers;
}