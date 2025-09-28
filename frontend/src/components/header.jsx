import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "./UI/button";
import Login from "./Login";
import Signup from "./Signup";

export function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [userName, setUserName] = useState(null);
  const [role, setRole] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("userName");
    const storedRole = localStorage.getItem("role"); // 👈 role saved in localStorage

    if (token && storedName) {
      setUserName(storedName);
    }
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    setUserName(null);
    setRole(null);
    setShowMenu(false);
    navigate("/"); // redirect to home
  };

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
      <div className="flex items-center gap-2 relative">
        {!userName ? (
          <>
            <Button variant="outline" size="sm" onClick={() => setShowLogin(true)}>Login</Button>
            <Button variant="outline" size="sm" onClick={() => setShowSignup(true)}>Register</Button>
          </>
        ) : (
          <div className="flex items-center gap-3">
            {/* Show Add Your Art button if role is artist */}
            {role === "artist" && (
              <Button
                variant="default"
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => navigate("/addArt")}
              >
                Add Your Art
              </Button>
            )}

            <div className="relative">
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {userName}
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
                  <button
                    onClick={() => { setShowMenu(false); navigate("/profile"); }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => { setShowMenu(false); navigate("/orders"); }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Orders
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
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
