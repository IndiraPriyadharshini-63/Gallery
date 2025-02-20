import React from "react";

const Categories = ({ category }) => {
  return (
    <li
      key={category}
      className={`px-4 py-2 mt-2 rounded-lg cursor-pointer transition-all ${
        selectedCategory === category
          ? "bg-teal-500 text-white"
          : darkMode
          ? "bg-blue-700 text-white"
          : "bg-orange-300 text-gray-800"
      }`}
      onClick={() => setSelectedCategory(category)}
    >
      {category}
    </li>
  );
};

export default Categories;
