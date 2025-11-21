// import { useDispatch } from "react-redux";
// import { logout } from "../features/authSlice";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-lg px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-semibold">Task Manager</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/dashboard"
            className="hover:text-blue-400 transition-colors duration-200 font-medium"
          >
            Dashboard
          </Link>

          <Link
            to="/tasks"
            className="hover:text-blue-400 transition-colors duration-200 font-medium"
          >
            Tasks
          </Link>

          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium">
            Logout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 space-y-4">
          <Link
            to="/dashboard"
            className="block hover:text-blue-400 font-medium"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            to="/tasks"
            className="block hover:text-blue-400 font-medium"
            onClick={() => setOpen(false)}
          >
            Tasks
          </Link>

          <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
