import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddPost({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [medium, setMedium] = useState("");
  const [style, setStyle] = useState("");
  const [loading, setLoading] = useState(false);

  // Convert file to Base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submit triggered");

    // Get user info from localStorage
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("UserName"); // capital U & N

    console.log("Debug -> userId:", userId, "username:", username);

    if (!userId || !username) {
      toast.error("User not logged in!");
      return;
    }

    if (!title || !description || !price) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const imageBase64 = image ? await fileToBase64(image) : "";

      const payload = {
        title,
        description,
        price: Number(price),
        medium,
        style,
        image: imageBase64,
        userId,
        username,
      };

      console.log("Payload to API:", payload);

      const response = await fetch("http://localhost:3000/api/v1/artworks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok) {
        toast.error(data.error || "Failed to post ad");
        setLoading(false);
        return;
      }

      toast.success("Ad posted successfully!");
      setLoading(false);

      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setImage(null);
      setImagePreview(null);
      setMedium("");
      setStyle("");

      // Close modal after 1s
      setTimeout(() => {
        if (onClose) onClose();
      }, 1000);
    } catch (err) {
      console.error("Error in API call:", err);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Add Post</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-full h-40 object-cover rounded-lg border"
            />
          )}
        </div>

        <input
          type="text"
          placeholder="Medium"
          value={medium}
          onChange={(e) => setMedium(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white rounded-lg transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Posting..." : "Add Post"}
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
    </div>
  );
}
