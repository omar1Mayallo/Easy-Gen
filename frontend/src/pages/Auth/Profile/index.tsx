import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FiUser, FiEdit, FiSave, FiX } from "react-icons/fi";
import { FaLock, FaSpinner } from "react-icons/fa";
import { BsFillEnvelopeFill } from "react-icons/bs";
import {
  usePasswordForm,
  useUserInfoForm,
  type PasswordFormValues,
  type UserInfoFormValues,
} from "../auth.schema";
import { authService, type ApiError, type UserProfile } from "../auth.service";

const Profile = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "password">("info");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register: registerInfo,
    handleSubmit: handleSubmitInfo,
    formState: { errors: infoErrors },
    reset: resetInfo,
  } = useUserInfoForm();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = usePasswordForm();

  // Fetch user profile
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery<UserProfile, ApiError>({
    queryKey: ["userProfile"],
    queryFn: authService.getUserProfile,
  });

  // Update user info
  const { mutate: updateInfo, isPending: isInfoPending } = useMutation({
    mutationFn: authService.editUserProfile,
    onError: (error: ApiError) => {
      setErrorMessage(error.message || "Failed to update user info");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      setErrorMessage(null);
      setSuccessMessage("User info updated successfully!");
      setIsEditing(false);
      resetInfo();
      setTimeout(() => setSuccessMessage(null), 3000);
    },
  });

  // Update password
  const { mutate: updatePassword, isPending: isPasswordPending } = useMutation({
    mutationFn: authService.editUserProfile,
    onError: (error: ApiError) => {
      setErrorMessage(error.message || "Failed to update password");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      setErrorMessage(null);
      setSuccessMessage("Password updated successfully!");
      setIsEditing(false);
      resetPassword();
      setTimeout(() => setSuccessMessage(null), 3000);
    },
  });

  const onSubmitInfo = (data: UserInfoFormValues) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const updateData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    ) as UserInfoFormValues;
    updateInfo(updateData);
  };

  const onSubmitPassword = (data: PasswordFormValues) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    if (!data.password) return; // Skip if password is empty
    const updateData = { password: data.password };
    updatePassword(updateData);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-100 dark:bg-neutral-900 flex items-center justify-center">
        <div className="w-full max-w-lg p-8 bg-white dark:bg-neutral-800 rounded-xl shadow-lg animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-neutral-700 rounded w-3/4 mx-auto mb-6"></div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 bg-gray-200 dark:bg-neutral-700 rounded-full"></div>
              <div className="h-5 bg-gray-200 dark:bg-neutral-700 rounded w-full"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 bg-gray-200 dark:bg-neutral-700 rounded-full"></div>
              <div className="h-5 bg-gray-200 dark:bg-neutral-700 rounded w-full"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 bg-gray-200 dark:bg-neutral-700 rounded-full"></div>
              <div className="h-5 bg-gray-200 dark:bg-neutral-700 rounded w-full"></div>
            </div>
            <div className="h-10 bg-gray-200 dark:bg-neutral-700 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-100 dark:bg-neutral-900 flex items-center justify-center">
        <div className="w-full max-w-lg p-8 bg-white dark:bg-neutral-800 rounded-xl shadow-lg text-center">
          <p className="text-red-500 text-lg font-medium">
            Failed to load profile: {error.message}
          </p>
          <button
            onClick={() =>
              queryClient.refetchQueries({ queryKey: ["userProfile"] })
            }
            className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 dark:bg-neutral-900 flex items-center justify-center py-8">
      <div className="w-full max-w-lg mx-4 bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Your Profile
        </h1>

        {!isEditing ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 bg-gray-50 dark:bg-neutral-700 p-4 rounded-lg">
              <FiUser className="text-amber-600 dark:text-amber-400 text-xl" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Name
                </p>
                <p className="text-lg text-gray-900 dark:text-gray-100">
                  {profile?.name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-gray-50 dark:bg-neutral-700 p-4 rounded-lg">
              <BsFillEnvelopeFill className="text-amber-600 dark:text-amber-400 text-xl" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email
                </p>
                <p className="text-lg text-gray-900 dark:text-gray-100">
                  {profile?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-gray-50 dark:bg-neutral-700 p-4 rounded-lg">
              <FiUser className="text-amber-600 dark:text-amber-400 text-xl" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Role
                </p>
                <p className="text-lg text-gray-900 dark:text-gray-100 capitalize">
                  {profile?.role}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsEditing(true);
                resetInfo({ name: profile?.name, email: profile?.email });
                resetPassword({ password: "", confirmPassword: "" });
              }}
              className="w-full px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center space-x-2 text-sm md:text-base"
              aria-label="Edit profile"
            >
              <FiEdit />
              <span>Edit Profile</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-neutral-700">
              <button
                type="button"
                className={`flex-1 py-2 text-sm md:text-base font-medium transition-colors ${
                  activeTab === "info"
                    ? "text-amber-600 dark:text-amber-400 border-b-2 border-amber-600"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                onClick={() => setActiveTab("info")}
                aria-label="Edit user info"
              >
                User Info
              </button>
              <button
                type="button"
                className={`flex-1 py-2 text-sm md:text-base font-medium transition-colors ${
                  activeTab === "password"
                    ? "text-amber-600 dark:text-amber-400 border-b-2 border-amber-600"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                onClick={() => setActiveTab("password")}
                aria-label="Change password"
              >
                Password
              </button>
            </div>

            {/* User Info Form */}
            {activeTab === "info" && (
              <form
                onSubmit={handleSubmitInfo(onSubmitInfo)}
                className="space-y-6"
              >
                {/* Name */}
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                      <FiUser />
                    </span>
                    <input
                      type="text"
                      id="name"
                      {...registerInfo("name")}
                      className={`w-full pl-10 pr-4 py-3 text-sm border rounded-lg transition duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-neutral-700 focus:ring-amber-500 focus:border-amber-500 ${
                        infoErrors.name
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your name"
                      disabled={isInfoPending}
                      aria-invalid={infoErrors.name ? "true" : "false"}
                    />
                  </div>
                  {infoErrors.name && (
                    <p className="mt-1 text-sm text-red-500" role="alert">
                      {infoErrors.name.message}
                    </p>
                  )}
                </div>

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
                      <BsFillEnvelopeFill />
                    </span>
                    <input
                      type="email"
                      id="email"
                      {...registerInfo("email")}
                      className={`w-full pl-10 pr-4 py-3 text-sm border rounded-lg transition duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-neutral-700 focus:ring-amber-500 focus:border-amber-500 ${
                        infoErrors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your email"
                      disabled={isInfoPending}
                      aria-invalid={infoErrors.email ? "true" : "false"}
                    />
                  </div>
                  {infoErrors.email && (
                    <p className="mt-1 text-sm text-red-500" role="alert">
                      {infoErrors.email.message}
                    </p>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                  <button
                    type="submit"
                    className={`flex-1 px-4 py-3 text-white rounded-lg transition duration-200 flex items-center justify-center text-sm md:text-base ${
                      isInfoPending
                        ? "bg-amber-400 cursor-not-allowed"
                        : "bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:ring-amber-300"
                    }`}
                    disabled={isInfoPending}
                    aria-label="Save user info"
                  >
                    {isInfoPending ? (
                      <FaSpinner className="animate-spin h-5 w-5 mr-2 text-white" />
                    ) : (
                      <FiSave className="mr-2" />
                    )}
                    {isInfoPending ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      resetInfo();
                      resetPassword();
                      setErrorMessage(null);
                      setSuccessMessage(null);
                    }}
                    className="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600 rounded-lg transition-colors text-sm md:text-base flex items-center justify-center"
                    disabled={isInfoPending || isPasswordPending}
                    aria-label="Cancel editing"
                  >
                    <FiX className="mr-2" />
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Password Form */}
            {activeTab === "password" && (
              <form
                onSubmit={handleSubmitPassword(onSubmitPassword)}
                className="space-y-6"
              >
                {/* Password */}
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                      <FaLock />
                    </span>
                    <input
                      type="password"
                      id="password"
                      {...registerPassword("password")}
                      className={`w-full pl-10 pr-4 py-3 text-sm border rounded-lg transition duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-neutral-700 focus:ring-amber-500 focus:border-amber-500 ${
                        passwordErrors.password
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter new password"
                      disabled={isPasswordPending}
                      aria-invalid={passwordErrors.password ? "true" : "false"}
                    />
                  </div>
                  {passwordErrors.password && (
                    <p className="mt-1 text-sm text-red-500" role="alert">
                      {passwordErrors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                      <FaLock />
                    </span>
                    <input
                      type="password"
                      id="confirmPassword"
                      {...registerPassword("confirmPassword")}
                      className={`w-full pl-10 pr-4 py-3 text-sm border rounded-lg transition duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-neutral-700 focus:ring-amber-500 focus:border-amber-500 ${
                        passwordErrors.confirmPassword
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Confirm new password"
                      disabled={isPasswordPending}
                      aria-invalid={
                        passwordErrors.confirmPassword ? "true" : "false"
                      }
                    />
                  </div>
                  {passwordErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500" role="alert">
                      {passwordErrors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                  <button
                    type="submit"
                    className={`flex-1 px-4 py-3 text-white rounded-lg transition duration-200 flex items-center justify-center text-sm md:text-base ${
                      isPasswordPending
                        ? "bg-amber-400 cursor-not-allowed"
                        : "bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:ring-amber-300"
                    }`}
                    disabled={isPasswordPending}
                    aria-label="Save password"
                  >
                    {isPasswordPending ? (
                      <FaSpinner className="animate-spin h-5 w-5 mr-2 text-white" />
                    ) : (
                      <FiSave className="mr-2" />
                    )}
                    {isPasswordPending ? "Saving..." : "Save Password"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      resetInfo();
                      resetPassword();
                      setErrorMessage(null);
                      setSuccessMessage(null);
                    }}
                    className="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600 rounded-lg transition-colors text-sm md:text-base flex items-center justify-center"
                    disabled={isInfoPending || isPasswordPending}
                    aria-label="Cancel editing"
                  >
                    <FiX className="mr-2" />
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Messages */}
            {errorMessage && (
              <div
                className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm text-center"
                role="alert"
              >
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div
                className="mt-4 p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg text-sm text-center"
                role="alert"
              >
                {successMessage}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
