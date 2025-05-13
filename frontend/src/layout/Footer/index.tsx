import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-700 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          {/* Copyright text */}
          <p className="text-sm text-gray-700 dark:text-gray-300">
            © {new Date().getFullYear()} EasyGenerator. All rights reserved.
          </p>

          {/* Made with love */}
          <div className="flex items-center">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Made with
            </span>
            <a
              href="https://www.linkedin.com/in/omarmayallo/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center"
            >
              <FaHeart className="mx-2 text-red-500 dark:text-red-400 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium text-gray-700 hover:text-amber-600 dark:text-gray-300 dark:hover:text-amber-400 transition-colors underline">
                by Omar Mayallo
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
