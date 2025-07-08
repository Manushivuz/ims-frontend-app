import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { loginUrl } from "./URIs.js";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {
    setIsLoggedIn,
    storeTokenInLocalStorage,
    storeIsAdminState,
    storeUserId,
  } = useAuthContext();

  const login = async () => {
    setLoading(true);
    try {
      const response = await axios.post(loginUrl, { email, password });
      toast.success(`Login Successful`);
      setIsLoggedIn(true);
      storeTokenInLocalStorage(response.data.token);
      storeUserId(response.data.user.id);
      storeIsAdminState(response.data.user.isAdmin);
      navigate(`/dashboard`);
    } catch (error) {
      console.log(error);
      toast.error(`Error Logging in.`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-3 sm:px-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
      <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-sm sm:max-w-md shadow-lg">
        <h1 className="text-xl sm:text-2xl font-semibold text-blue-800 text-center mb-1">
          LOG-IN
        </h1>
        <i>
          <h2 className="text-xs sm:text-sm text-gray-600 text-center mb-4 sm:mb-5">
            Log-in to access your account
          </h2>
        </i>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
          <div className="flex flex-col gap-1 sm:gap-2">
            <label htmlFor="email" className="text-xs sm:text-sm text-gray-600 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2.5 sm:p-3 border border-gray-300 rounded-md text-xs sm:text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-1 sm:gap-2">
            <label htmlFor="password" className="text-xs sm:text-sm text-gray-600 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-2.5 sm:p-3 border border-gray-300 rounded-md text-xs sm:text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs sm:text-sm text-center mt-1">{error}</p>
          )}

          <input
            type="submit"
            value={loading ? "Processing..." : "Login"}
            className="mt-2 sm:mt-3 bg-blue-500 text-white p-2.5 sm:p-3 rounded-lg text-xs sm:text-sm cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
          />
        </form>

        <p className="text-xs text-center text-gray-600 mt-3 sm:mt-4">
          {`Don't`} have an account?{" "}
          <a href="/signup" className="text-purple-700 hover:underline font-medium">
            Sign-up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
