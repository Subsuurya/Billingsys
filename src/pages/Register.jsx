import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.fullname.trim()) {
      errors.fullname = "Full name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/register-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname: formData.fullname,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.ok) {
        setSuccessMsg(
          "Registration successful. Please check your email to activate your account."
        );
        setFormData({
          fullname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setErrorMsg((data && data.message) || "Registration failed.");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative bg-cover bg-center"
      style={{ backgroundImage: "url('/finance.png')" }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(102, 0, 51, 0.9)" }}
      ></div>

      <motion.div
        className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 space-y-8 relative z-10"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create Account
        </h2>

        {successMsg && (
          <div className="text-green-600 text-center font-medium">{successMsg}</div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                autoComplete="name"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleChange}
                disabled={isLoading}
              />
              {formErrors.fullname && (
                <div className="text-red-500 text-xs mt-1">{formErrors.fullname}</div>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
              {formErrors.email && (
                <div className="text-red-500 text-xs mt-1">{formErrors.email}</div>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm pr-10"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-[#660033] focus:outline-none transition-colors"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1.5 12C3.5 7 8 4 12 4s8.5 3 10.5 8c-2 5-6.5 8-10.5 8s-8.5-3-10.5-8z"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="#525252ff"
                        strokeWidth="2"
                        fill={showPassword ? "#fff" : "none"}
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.94 17.94A10.05 10.05 0 0112 20c-4.5 0-8.5-3-10.5-8a10.05 10.05 0 013.06-4.94M6.06 6.06A10.05 10.05 0 0112 4c4.5 0 8.5 3 10.5 8a10.05 10.05 0 01-4.94 6.06M1 1l22 22"
                      />
                      <circle cx="12" cy="12" r="3" stroke="#660033" strokeWidth="2" fill="none" />
                    </svg>
                  )}
                </button>
              </div>
              {formErrors.password && (
                <div className="text-red-500 text-xs mt-1">{formErrors.password}</div>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm pr-10"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-[#660033] focus:outline-none transition-colors"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                >
                  {showConfirmPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1.5 12C3.5 7 8 4 12 4s8.5 3 10.5 8c-2 5-6.5 8-10.5 8s-8.5-3-10.5-8z"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="#660033"
                        strokeWidth="2"
                        fill={showConfirmPassword ? "#fff" : "none"}
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.94 17.94A10.05 10.05 0 0112 20c-4.5 0-8.5-3-10.5-8a10.05 10.05 0 013.06-4.94M6.06 6.06A10.05 10.05 0 0112 4c4.5 0 8.5 3 10.5 8a10.05 10.05 0 01-4.94 6.06M1 1l22 22"
                      />
                      <circle cx="12" cy="12" r="3" stroke="#660033" strokeWidth="2" fill="none" />
                    </svg>
                  )}
                </button>
              </div>
              {formErrors.confirmPassword && (
                <div className="text-red-500 text-xs mt-1">
                  {formErrors.confirmPassword}
                </div>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#660033] hover:bg-pink-800"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </div>

          <div>
            <button
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-[#660033] bg-white hover:bg-gray-50 mt-2"
              onClick={() => navigate("/")}
              disabled={isLoading}
            >
              Back to Login
            </button>
          </div>
        </form>

        {errorMsg && <div className="text-red-500 text-center mt-2">{errorMsg}</div>}

        <div className="text-xs text-gray-400 text-center mt-6">
          &copy; {new Date().getFullYear()} Total Dynamic Technology Holding
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
