import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/data.json") // fetches from public or src depending on setup
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error loading recipes:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🍴 Delicious Recipes
      </h1>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">

        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="rounded-xl w-full h-48 object-cover mb-4 hover:scale-105 transition-transform duration-300"
            />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {recipe.title}
            </h2>
            <p className="text-gray-600 text-sm">{recipe.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
