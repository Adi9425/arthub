import React, { useEffect, useState } from "react";

export default function ArtPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Utility: Convert base64 string to a valid image source
  const base64ToImageSrc = (base64, mimeType = "jpeg") => {
    if (!base64) return "";
    return `data:image/${mimeType};base64,${base64}`;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/artworks/search"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch artworks");
        }

        const data = await response.json();
        setPosts(data); // expects array of artworks
      } catch (err) {
        console.error(err);
        setError("Failed to fetch artworks from server");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Art Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div
            key={post._id || index}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            {post.image && (
              <img
                src={base64ToImageSrc(post.image)} // ✅ use converter here
                alt={post.title}
                className="w-full h-48 object-cover rounded"
              />
            )}
            <h2 className="text-xl font-semibold mt-2">{post.title}</h2>
            <p className="text-gray-500 text-sm">By {post.artist}</p>
            <p className="text-gray-600 mt-1">{post.description}</p>
            <p className="text-blue-500 mt-2 font-medium">
              Price: ${post.price}
            </p>
            <p className="text-sm mt-1 text-gray-400">
              Medium: {post.medium} | Style: {post.style}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
