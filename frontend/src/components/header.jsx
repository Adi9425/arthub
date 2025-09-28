import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "./UI/button";
import Login from "./Login";
import Signup from "./Signup";

export function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md relative z-20">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-8">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,10 80,40 50,70 20,40" fill="url(#logoGradient)" />
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className="text-xl font-bold text-gray-900">ARTHUB</span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <Link to="/art" className="text-gray-700 hover:text-gray-900 font-medium">ART</Link>
        <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">COMMUNITY</a>
        <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">ABOUT</a>
      </nav>

      {/* User Actions */}
      <div className="flex items-center gap-2">
        {/* <Button variant="outline" size="sm">Visitor</Button>
        <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">Artist</Button> */}

        <Button variant="outline" size="sm" onClick={() => setShowLogin(true)}>Login</Button>
        <Button variant="outline" size="sm" onClick={() => setShowSignup(true)}>Register</Button>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative p-6">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
              onClick={() => setShowLogin(false)}
            >
              ✕
            </button>
            <Login />
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 p-4 overflow-auto">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative p-6 max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
              onClick={() => setShowSignup(false)}
            >
              ✕
            </button>
            <Signup />
          </div>
        </div>
      )}
    </header>
  );
}
