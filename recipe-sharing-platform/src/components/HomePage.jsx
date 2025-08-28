import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import initialData from "../data.json";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("recipes");
    if (stored) {
      try {
        setRecipes(JSON.parse(stored));
      } catch {
        setRecipes(initialData);
      }
    } else {
      // If nothing in localStorage, seed it with initial data (optional)
      localStorage.setItem("recipes", JSON.stringify(initialData));
      setRecipes(initialData);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">🍴 Recipe Sharing</h1>
        <Link to="/add" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          ➕ Add Recipe
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {recipes.map((recipe) => (
          <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="group">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col h-full">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="rounded-xl w-full h-48 object-cover mb-4 group-hover:scale-105 transition-transform duration-300"
              />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{recipe.title}</h2>
              <p className="text-gray-600 text-sm flex-grow">{recipe.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
