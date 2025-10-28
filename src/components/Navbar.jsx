import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, clearSession } from "../utils/auth";
import { Menu, X } from "lucide-react"; // optional icons

export default function Navbar() {
  const navigate = useNavigate();
  const auth = isAuthenticated();
  const [isOpen, setIsOpen] = useState(false);

  function handleLogout() {
    clearSession();
    navigate("/auth/login");
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 py-4 flex items-center justify-between">
        {/* === Logo Section === */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-linear-to-br from-blue-600 to-indigo-600 grid place-items-center text-white font-bold">
            T
          </div>
          <div>
            <Link to="/" className="text-lg font-semibold">
              TicketApp
            </Link>
            <div className="text-xs text-slate-500">
              Simple ticket management
            </div>
          </div>
        </div>

        {/* mobile */}
        <button
          className="md:hidden text-gray-700 text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* === Nav Links === */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-white border-t shadow-md md:shadow-none md:border-0 md:static md:block transition-all duration-300`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-end md:gap-6 p-4 md:p-0">
            <Link
              to="/"
              className="px-3 py-2 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            {auth && (
              <Link
                to="/dashboard"
                className="px-3 py-2 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            )}

            {auth && (
              <Link
                to="/tickets"
                className="px-3 py-2 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Tickets
              </Link>
            )}

            {!auth && (
              <Link
                to="/auth/login"
                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}

            {auth && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="px-3 py-2 bg-rose-500 text-white rounded hover:bg-rose-600"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

