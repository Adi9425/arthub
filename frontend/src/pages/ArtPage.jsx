// import React, { useEffect, useState } from "react";

// export default function ArtPage() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         // Replace with your actual API endpoint
//         const response = await fetch("https://your-backend-api.com/posts");
//         if (!response.ok) throw new Error("Failed to fetch posts");

//         const data = await response.json();
//         setPosts(data);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch posts from server");
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <h1 className="text-3xl font-bold mb-6 text-center">Art Posts</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {posts.map((post) => (
//           <div key={post.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
//             {post.image && (
//               <img
//                 src={post.image} // Assuming API provides URL or base64 with proper data URI
//                 alt={post.title}
//                 className="w-full h-48 object-cover rounded"
//               />
//             )}
//             <h2 className="text-xl font-semibold mt-2">{post.title}</h2>
//             <p className="text-gray-500 text-sm">By {post.artist}</p>
//             <p className="text-gray-600 mt-1">{post.description}</p>
//             <p className="text-blue-500 mt-2 font-medium">Price: ${post.price}</p>
//             <p className="text-sm mt-1 text-gray-400">Medium: {post.medium} | Style: {post.style}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";

export default function ArtPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // For demonstration, using your provided data
    const fetchData = async () => {
      try {
        // Replace this with your actual API call
        const data = [
          {
            title: "Morning Sunrise",
            artist: "Neha Patel",
            description: "A vibrant sunrise with yellow and red hues.",
            price: 120,
            image: "<base64_encoded_image>",
            medium: "Oil on Canvas",
            style: "Impressionism"
          },
          {
            title: "Urban Landscape",
            artist: "Rahul Sen",
            description: "City buildings depicted in bold colors.",
            price: 200,
            image: "<base64_encoded_image>",
            medium: "Acrylic",
            style: "Modern"
          },
          {
            title: "Forest Dreams",
            artist: "Priya Mehra",
            description: "Dreamy depiction of a lush forest.",
            price: 175,
            image: "<base64_encoded_image>",
            medium: "Watercolor",
            style: "Abstract"
          },
          {
            title: "River Flow",
            artist: "Arjun Das",
            description: "A gentle river flowing through fields.",
            price: 135,
            image: "<base64_encoded_image>",
            medium: "Oil on Canvas",
            style: "Realism"
          },
          {
            title: "Festival Night",
            artist: "Simran Kaur",
            description: "A lively festival scene with colorful lights.",
            price: 210,
            image: "<base64_encoded_image>",
            medium: "Acrylic",
            style: "Modern"
          }
        ];

        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch posts");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Art Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            {post.image && (
              <img
                src={`data:image/jpeg;base64,${post.image}`}
                alt={post.title}
                className="w-full h-48 object-cover rounded"
              />
            )}
            <h2 className="text-xl font-semibold mt-2">{post.title}</h2>
            <p className="text-gray-500 text-sm">By {post.artist}</p>
            <p className="text-gray-600 mt-1">{post.description}</p>
            <p className="text-blue-500 mt-2 font-medium">Price: ${post.price}</p>
            <p className="text-sm mt-1 text-gray-400">Medium: {post.medium} | Style: {post.style}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
