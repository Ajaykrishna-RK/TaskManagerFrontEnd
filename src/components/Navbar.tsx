
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ButtonLayout from "./common/ButtonLayout";
import { useDispatch } from "react-redux";
import { clearAuth } from "../redux/slice/AuthSlice";
import { navbarLinks } from "../data/Data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const linkClass = (path: string) =>
    location.pathname === path
      ? "text-blue-600 font-semibold" // Active
      : "text-gray-700 hover:text-blue-400";
  const logout = () => {
    dispatch(clearAuth());
  };
  return (
    <nav className="bg-gray-900 text-white shadow-lg px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-semibold">Task Manager</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navbarLinks?.map((item) => (
            <Link
              to={item.link}
              className={`font-medium transition-colors duration-200 ${linkClass(
                item.link
              )}`}
            >
              {item.name}
            </Link>
          ))}

          <ButtonLayout onClick={logout} variant="danger">
            logout
          </ButtonLayout>
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
        <div className="md:hidden mt-4 flex flex-col space-y-4">
          {navbarLinks?.map((item) => (
            <Link
              to={item.link}
              className={`font-medium transition-colors duration-200 ${linkClass(
                item.link
              )}`}
            >
              {item.name}
            </Link>
          ))}

          <ButtonLayout variant="danger">logout</ButtonLayout>
        </div>
      )}
    </nav>
  );
}
