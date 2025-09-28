import React, { useState } from "react";

export default function Signup() {
  const [role, setRole] = useState("visitor"); // visitor or artist
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [socialLinks, setSocialLinks] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("Please fill all required fields");
      return;
    }

    if (role === "artist" && (!bio || !portfolio)) {
      setError("Please fill bio and portfolio for artist");
      return;
    }

    setError("");
    console.log("Signing up as", role, { username, email, password, bio, portfolio, socialLinks, profilePic });
    // TODO: send API request
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>

      {/* Role Selection */}
      <div className="flex justify-center gap-6 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="role"
            value="visitor"
            checked={role === "visitor"}
            onChange={() => setRole("visitor")}
            className="w-4 h-4 accent-blue-500"
          />
          Visitor
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="role"
            value="artist"
            checked={role === "artist"}
            onChange={() => setRole("artist")}
            className="w-4 h-4 accent-blue-500"
          />
          Artist
        </label>
      </div>

      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Artist additional fields */}
        {role === "artist" && (
          <>
            <textarea
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Portfolio URL"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Social Links"
              value={socialLinks}
              onChange={(e) => setSocialLinks(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="file"
              onChange={(e) => setProfilePic(e.target.files[0])}
              className="w-full"
            />
          </>
        )}

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
