import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

function Navbar({ setQuery }) {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");


  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const debounceTimer = setTimeout(() => {
      setQuery(value);
    }, 300);

    return () => clearTimeout(debounceTimer); 
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      {/* Brand Name */}
      <div className="text-xl font-bold">
        <Link to="/">NoteApp</Link>
      </div>

      {/* Search Input */}
      <div className="flex-grow mx-4">
        <input
          type="text"
          placeholder="Search notes by title or description..."
          className="w-full max-w-md bg-gray-600 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center">
        {!user ? (
          <>
            <Link
              to="/login"
              className="bg-blue-500 px-4 py-2 rounded mr-4 hover:bg-blue-400 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-green-500 px-4 py-2 rounded mr-4 hover:bg-green-400 transition"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="mr-4">{user?.name || "Guest"}</span>
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-400 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
