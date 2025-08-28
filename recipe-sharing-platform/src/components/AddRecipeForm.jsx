import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/*
  AddRecipeForm:
  - Saves new recipes to localStorage under key "recipes"
  - Accepts ingredients as comma-separated OR one-per-line
  - Accepts steps as one-per-line
*/
const AddRecipeForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // optional
  const [ingredientsText, setIngredientsText] = useState("");
  const [stepsText, setStepsText] = useState("");

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({}); // track touched fields to show errors after user interacts

  // helper: parse ingredients (commas or newlines)
  const parseList = (text) => {
    if (!text) return [];
    // if there are newlines, split by newline, else split by commas
    const delimiter = text.includes("\n") ? "\n" : ",";
    return text
      .split(delimiter)
      .map((s) => s.trim())
      .filter(Boolean);
  };

  // validation function
  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Please enter a recipe title.";
    const ingredients = parseList(ingredientsText);
    if (ingredients.length < 2)
      newErrors.ingredients = "Please list at least 2 ingredients (comma or new line separated).";
    const steps = parseList(stepsText);
    if (steps.length < 1) newErrors.steps = "Please add at least one step.";
    return newErrors;
  };

  // recompute validation whenever inputs change
  useEffect(() => {
    setErrors(validate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, ingredientsText, stepsText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    setTouched({ title: true, ingredients: true, steps: true });

    if (Object.keys(newErrors).length > 0) {
      // keep user on the page and show errors
      return;
    }

    // Build recipe object
    const ingredients = parseList(ingredientsText);
    const steps = parseList(stepsText);
    const newRecipe = {
      id: Date.now(), // simple unique id
      title: title.trim(),
      summary: steps.join(" ").slice(0, 120) || "A tasty recipe",
      image: imageUrl.trim() || "https://via.placeholder.com/800x500",
      ingredients,
      instructions: steps,
    };

    // Save into localStorage (merge with existing)
    const stored = localStorage.getItem("recipes");
    const arr = stored ? JSON.parse(stored) : [];
    arr.unshift(newRecipe); // add newest to front
    localStorage.setItem("recipes", JSON.stringify(arr));

    // Optionally: show a quick confirmation (alert) then navigate back
    // simple alert (you can change to a nicer toast)
    alert("Recipe added! 🎉");
    navigate("/"); // go back to home (HomePage will reload data from localStorage)
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Add a New Recipe 🍳</h1>

        <form onSubmit={handleSubmit} noValidate>
          {/* Title */}
          <label className="block mb-2">
            <span className="text-sm font-medium">Recipe Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, title: true }))}
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                touched.title && errors.title ? "border-red-400" : "border-gray-200"
              }`}
              placeholder="e.g. Cheesy Tomato Pasta"
            />
            {touched.title && errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title}</p>
            )}
          </label>

          {/* Image URL (optional) */}
          <label className="block mb-4">
            <span className="text-sm font-medium">Image URL (optional)</span>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="https://example.com/image.jpg (or leave blank)"
            />
          </label>

          {/* Ingredients */}
          <label className="block mb-4">
            <span className="text-sm font-medium">Ingredients (comma or newline separated)</span>
            <textarea
              value={ingredientsText}
              onChange={(e) => setIngredientsText(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, ingredients: true }))}
              rows={4}
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                touched.ingredients && errors.ingredients ? "border-red-400" : "border-gray-200"
              }`}
              placeholder={"e.g.\nSpaghetti\nEggs\nBacon\nor: Spaghetti, Eggs, Bacon"}
            />
            {touched.ingredients && errors.ingredients && (
              <p className="text-red-600 text-sm mt-1">{errors.ingredients}</p>
            )}
          </label>

          {/* Steps */}
          <label className="block mb-4">
            <span className="text-sm font-medium">Preparation Steps (one per line)</span>
            <textarea
              value={stepsText}
              onChange={(e) => setStepsText(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, steps: true }))}
              rows={6}
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                touched.steps && errors.steps ? "border-red-400" : "border-gray-200"
              }`}
              placeholder={"Boil pasta\nFry bacon\nMix eggs & cheese\n..."}
            />
            {touched.steps && errors.steps && (
              <p className="text-red-600 text-sm mt-1">{errors.steps}</p>
            )}
          </label>

          {/* Buttons */}
          <div className="flex items-center gap-3 mt-4">
            <button
              type="submit"
              disabled={!isValid}
              className={`px-4 py-2 rounded-lg text-white ${
                isValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
              } transition`}
            >
              ➕ Add Recipe
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;
