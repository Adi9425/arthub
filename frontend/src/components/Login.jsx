import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [role, setRole] = useState("visitor"); // default role
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { role, email, password };

      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Login failed. Please try again.", {
          position: "top-center",
        });
        setLoading(false);
        return;
      }

      // Save user info to localStorage
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userName", data.userName);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      

      toast.success("Login successful! Redirecting...", {
        position: "top-center",
        autoClose: 2000,
      });

      setLoading(false);

      // Redirect after short delay
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
      });
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
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

        <button
          type="submit"
          className={`w-full py-3 text-white rounded-lg transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className="text-center text-gray-600 mt-4">
        Don't have an account?{" "}
        <a href="#" className="text-blue-500 font-medium">
          Sign up
        </a>
      </p>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
}
