// src/components/RecipeDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import recipesData from "../data.json"; // import the mock data

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const found = recipesData.find((r) => r.id === parseInt(id, 10));
    setRecipe(found || null);
  }, [id]);

  if (recipe === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-4">Recipe not found.</p>
          <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-3">{recipe.title}</h1>
          <p className="text-gray-700 mb-6">{recipe.summary}</p>

          <div className="md:flex md:gap-8">
            {/* Ingredients card */}
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {recipe.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Instructions card */}
            <div className="md:w-1/2">
              <h2 className="text-xl font-semibold mb-3">Instructions</h2>
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                {Array.isArray(recipe.instructions)
                  ? recipe.instructions.map((step, idx) => <li key={idx}>{step}</li>)
                  : String(recipe.instructions).split(".").filter(Boolean).map((s, idx) => <li key={idx}>{s.trim()}</li>)
                }
              </ol>
            </div>
          </div>

          <div className="mt-6">
            <Link to="/" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              ⬅ Back to Recipes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
