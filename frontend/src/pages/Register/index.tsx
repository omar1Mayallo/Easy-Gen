import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg dark:bg-neutral-800">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">
          Register
        </h2>
        <form className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg transition duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-neutral-700 focus:ring-amber-500"
              placeholder="name"
            />
            <p className="mt-1 text-sm text-red-500 hidden">Error message</p>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg transition duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-neutral-700 focus:ring-amber-500"
              placeholder="email"
            />
            <p className="mt-1 text-sm text-red-500 hidden">Error message</p>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg transition duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-neutral-700 focus:ring-amber-500"
              placeholder="Password"
            />
            <p className="mt-1 text-sm text-red-500 hidden">Error message</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-amber-600 rounded-lg hover:bg-amber-700 focus:ring-4 focus:ring-amber-300"
          >
            Register
          </button>

          {/* Error Message */}
          <p className="mt-2 text-center text-sm text-red-500 hidden">
            Invalid credentials
          </p>

          {/* Success Message */}
          <p className="mt-2 text-center text-sm text-amber-500 hidden">
            Register successful
          </p>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-amber-600 dark:text-amber-400 hover:underline"
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
