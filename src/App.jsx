import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FiUpload, FiSun, FiMoon } from "react-icons/fi";
import Categories from "./components/Categories";

const categories = ["All", "Nature", "Animals", "Technology"];
const API_URL =
  "https://api.unsplash.com/photos/random?count=6&client_id=YOUR_ACCESS_KEY";
const UPLOAD_URL = "https://storage.googleapis.com/YOUR_BUCKET_NAME/upload";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [uploadCategory, setUploadCategory] = useState("Nature");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setImages(
        response.data.map((img) => ({
          id: img.id,
          src: img.urls.small,
          category: "Nature",
        }))
      );
    });
  }, []);
  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", uploadCategory);

    await axios.post(UPLOAD_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Photo uploaded successfully!");
  };

  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  return (
    <div
      className={`flex min-h-screen ${
        darkMode ? "bg-blue-900 text-white" : "bg-orange-100 text-black"
      }`}
    >
      <div
        className={`w-64 ${
          darkMode ? "bg-blue-800" : "bg-orange-200"
        } shadow-lg p-5`}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white font-semibold rounded-lg shadow-md w-full"
          onClick={handleUpload}
        >
          <FiUpload size={20} />
          <span>Upload Photo</span>
        </motion.button>
        <select
          className="mt-2 w-full p-2 rounded-lg"
          onChange={(e) => setUploadCategory(e.target.value)}
        >
          {categories
            .filter((cat) => cat !== "All")
            .map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>
        <ul className="mt-6">
          {categories.map((category) => (
            // <li
            //   key={category}
            //   className={`px-4 py-2 mt-2 rounded-lg cursor-pointer transition-all ${
            //     selectedCategory === category
            //       ? "bg-teal-500 text-white"
            //       : darkMode
            //       ? "bg-blue-700 text-white"
            //       : "bg-orange-300 text-gray-800"
            //   }`}
            //   onClick={() => setSelectedCategory(category)}
            // >
            //   {category}
            // </li>
            <Categories category={category} />
          ))}
        </ul>
      </div>

      <div className="flex-1 p-5 relative">
        <button
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-400 dark:bg-gray-700"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
        </button>
        <h1 className="text-3xl font-bold text-center mb-6">
          Responsive Gallery
        </h1>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredImages.map((img) => (
            <motion.div
              key={img.id}
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={img.src}
                alt={img.category}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default App;
