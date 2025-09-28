import React, { useState } from "react";

export default function Login() {
  const [role, setRole] = useState("visitor"); // default role
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    try{
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.username);

      console.log("User saved to localStorage:", user);

      // Optional: Close login modal here or redirect
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-5 text-center font-semibold">Login</h2>

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

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username or Email"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
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

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Log In
        </button>
      </form>

      <p className="text-center text-gray-600 mt-4">
        Don't have an account? <a href="#" className="text-blue-500 font-medium">Sign up</a>
      </p>
    </div>
  );
}
