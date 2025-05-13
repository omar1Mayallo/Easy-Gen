import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-65px)] bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 p-6">
      <div className="w-full max-w-md text-center">
        {/* Error Code */}
        <h1 className="text-9xl font-bold text-amber-600 dark:text-amber-400 mb-4">
          404
        </h1>

        {/* Error Message */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Page Not Found
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Home Link */}
        <Link
          to="/"
          className="inline-block rounded-md bg-amber-600 hover:bg-amber-700 px-6 py-3 text-center font-semibold text-white transition-colors dark:bg-amber-700 dark:hover:bg-amber-600"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
