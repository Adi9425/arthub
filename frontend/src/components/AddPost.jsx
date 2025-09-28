import React, { useState } from "react";

export default function AddPost({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [medium, setMedium] = useState("");
  const [style, setStyle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !price) {
      setError("Please fill all required fields");
      return;
    }

    setError("");
    console.log("New Post:", { title, description, price, image, medium, style });

    // TODO: Call API to save the post

    // Reset form
    setTitle("");
    setDescription("");
    setPrice("");
    setImage(null);
    setMedium("");
    setStyle("");

    // Close modal
    if (onClose) onClose();
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

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
        />

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

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Add Post
        </button>
      </form>
    </div>
  );
}

// Add post button 

// const [showAddPost, setShowAddPost] = useState(false);

// <Button variant="default" onClick={() => setShowAddPost(true)}>
//   Add Post
// </Button>

// {showAddPost && (
//   <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 p-4 overflow-auto">
//     <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative p-6 max-h-[90vh] overflow-y-auto">
//       <button
//         className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
//         onClick={() => setShowAddPost(false)}
//       >
//         ✕
//       </button>
//       <AddPost onClose={() => setShowAddPost(false)} />
//     </div>
//   </div>
// )}
