/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mNumber, setMNumber] = useState("");
  const [role, setRole] = useState("intern");
  const [error, setError] = useState("");

  // Password visibility toggle states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const signup = async () => {
    const signup = `${import.meta.env.VITE_BASE_URL}/api/auth/signup`;
    setLoading(true);
    try {
      const fullName = `${firstName} ${lastName}`;
      await axios.post(signup, {
        name: fullName,
        email: email,
        password: password,
        rpassword: confirmPassword,
        mnumber: mNumber,
        role: role,
        startDate: new Date().toISOString().split("T")[0],
      });
      toast.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.log(`Signup Error : ${error}`);
      toast.error(`Signup Error`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#69385C] via-[#C08497] to-[#F7AF9D] bg-[length:300%_300%] animate-bg-ease px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-sm sm:max-w-lg shadow-lg">
        <h1 className="text-xl sm:text-2xl font-semibold text-blue-800 text-center mb-1">
          REGISTER
        </h1>
        <i>
          <h2 className="text-xs sm:text-sm text-gray-600 text-center mb-4 sm:mb-5">
            Sign-up to get full access to our app!
          </h2>
        </i>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex flex-col gap-1 sm:gap-2 flex-1">
              <label htmlFor="firstName" className="text-xs sm:text-sm text-gray-600 font-medium">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="p-2.5 sm:p-3 border rounded-md text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter first name"
              />
            </div>

            <div className="flex flex-col gap-1 sm:gap-2 flex-1">
              <label htmlFor="lastName" className="text-xs sm:text-sm text-gray-600 font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="p-2.5 sm:p-3 border rounded-md text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter last name"
              />
            </div>
          </div>

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
              className="p-2.5 sm:p-3 border rounded-md text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-1 sm:gap-2">
            <label htmlFor="dob" className="text-xs sm:text-sm text-gray-600 font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="p-2.5 sm:p-3 border rounded-md text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1 sm:gap-2">
            <label htmlFor="mnumber" className="text-xs sm:text-sm text-gray-600 font-medium">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mnumber"
              value={mNumber}
              onChange={(e) => setMNumber(Number(e.target.value))}
              required
              className="p-2.5 sm:p-3 border rounded-md text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter mobile number"
            />
          </div>

          {/* Password field with toggle */}
          <div className="flex flex-col gap-1 sm:gap-2">
            <label htmlFor="password" className="text-xs sm:text-sm text-gray-600 font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="p-2.5 sm:p-3 border rounded-md text-xs sm:text-sm border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-12"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs sm:text-sm hover:text-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password field with toggle */}
          <div className="flex flex-col gap-1 sm:gap-2">
            <label htmlFor="confirmPassword" className="text-xs sm:text-sm text-gray-600 font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="p-2.5 sm:p-3 border rounded-md text-xs sm:text-sm border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-12"
                placeholder="Confirm password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs sm:text-sm hover:text-gray-700"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-xs text-center mt-2">{error}</p>
          )}
          <input
            type="submit"
            value={loading ? "Processing..." : "Sign Up"}
            className="mt-2 sm:mt-3 p-2.5 sm:p-3 bg-blue-500 text-white rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-xs sm:text-sm font-medium"
          />
        </form>

        <p className="text-xs text-gray-600 text-center mt-3 sm:mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-purple-700 hover:underline font-medium">
            Sign-in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
