import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useState } from "react";
import { FaEnvelope, FaLock, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLoginForm, type LoginFormValues } from "../auth.schema";
import { authService, type ApiError } from "../auth.service";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useLoginForm();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: authService.login,
    onError: (error: ApiError) => {
      setErrorMessage(error.message || "Login failed");
    },
    onSuccess: (data) => {
      setErrorMessage(null);
      reset();
      Cookies.set("token", data.token, { expires: 0.6667 }); // 16 hours
      localStorage.setItem("token", data.token);
      setSuccessMessage("Login successful! Redirecting to home...");
      setTimeout(() => (window.location.href = "/"), 2000);
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg dark:bg-neutral-800">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                <FaEnvelope />
              </span>
              <input
                type="email"
                id="email"
                {...register("email")}
                className={`w-full pl-10 pr-4 py-3 text-sm border rounded-lg transition duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-neutral-700 focus:ring-amber-500 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Email"
                disabled={isPending || isSuccess}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                <FaLock />
              </span>
              <input
                type="password"
                id="password"
                {...register("password")}
                className={`w-full pl-10 pr-4 py-3 text-sm border rounded-lg transition duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-neutral-700 focus:ring-amber-500 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Password"
                disabled={isPending || isSuccess}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full px-4 py-2 text-white rounded-lg transition duration-200 flex items-center justify-center ${
              isPending || isSuccess
                ? "bg-amber-400 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:ring-amber-300"
            }`}
            disabled={isPending || isSuccess}
          >
            {isPending ? (
              <FaSpinner className="animate-spin h-5 w-5 mr-2 text-white" />
            ) : null}
            {isPending ? "Processing..." : "Login"}
          </button>

          {/* Error Message */}
          {errorMessage && (
            <p className="mt-2 text-center text-sm text-red-500">
              {errorMessage}
            </p>
          )}

          {/* Success Message */}
          {successMessage && (
            <p className="mt-2 text-center text-sm text-amber-500">
              {successMessage}
            </p>
          )}
        </form>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-amber-600 dark:text-amber-400 hover:underline"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
