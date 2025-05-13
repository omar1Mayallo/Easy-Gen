import { FiLogIn, FiLogOut, FiMoon, FiSun, FiUser } from "react-icons/fi";
import { useToggleMode } from "./useToggleMode";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { authService } from "../../pages/Auth/auth.service";

const Header = () => {
  const { darkMode, toggleDarkMode } = useToggleMode();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication state on mount and update
  useEffect(() => {
    const token = Cookies.get("token") || localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-neutral-900 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Dark/Light mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* Auth buttons */}
            {isLoggedIn ? (
              <>
                {/* Profile Link */}
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                >
                  <FiUser size={18} />
                  <span>Profile</span>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <FiLogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              /* Login Button */
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
              >
                <FiLogIn size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
