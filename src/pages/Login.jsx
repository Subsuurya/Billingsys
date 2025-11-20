import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, get2FAStatus, verify2FA } from "../api/auth";
import { motion } from "framer-motion";

/**
 * Login page with email/password and 2FA (setup + verification) flow.
 */

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [step, setStep] = useState("login"); // 'login' | '2fa' | 'setup_2fa' | 'done'
  const [token, setToken] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await login(formData.email, formData.password);
      setToken(data.access_token);

      const status = await get2FAStatus(data.access_token);

      if (status.qrScanned === 1) {
        setStep("2fa");
      } else {
        setQrCodeUrl(status.qrLink);
        setStep("setup_2fa");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err?.message || "Failed to login. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FA = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await verify2FA(authCode, token);

      localStorage.setItem("access_token", token);
      localStorage.setItem("user_email", formData.email);

      setStep("done");
      navigate("/dashboard");
    } catch (err) {
      console.error("2FA error:", err);
      setError(err?.message || "Failed to verify 2FA code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (step === "done") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">Redirecting to dashboard...</h2>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8
                 relative bg-cover bg-center bg-[url('/finance.png')]
                 before:content-[''] before:absolute before:inset-0 before:bg-[#660033]/90"
    >
      <motion.div
        className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 space-y-8 relative"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {step === "login" ? "Sign In" : "2FA Verification"}
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {step === "login" && (
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#660033] focus:border-[#660033]"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#660033] focus:border-[#660033]"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#660033] hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#660033] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/register")}
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-[#660033] rounded-md shadow-sm text-sm font-medium text-[#660033] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#660033] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Account
              </button>
            </div>
          </form>
        )}

        {step === "setup_2fa" && (
          <>
            <div className="mb-4 text-center">
              <p className="text-sm text-gray-700 mb-2">
                Please scan this QR code with your Google Authenticator app
              </p>
              {qrCodeUrl && (
                <img
                  src={qrCodeUrl}
                  alt="2FA QR Code"
                  className="mx-auto mb-4"
                />
              )}
            </div>

            <form className="space-y-6" onSubmit={handle2FA}>
              <div>
                <label
                  htmlFor="authCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter 2FA Code
                </label>
                <input
                  id="authCode"
                  name="authCode"
                  type="text"
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#660033] focus:border-[#660033]"
                  placeholder="Enter 6-digit code"
                  value={authCode}
                  onChange={(e) => {
                    setAuthCode(e.target.value);
                    if (error) setError("");
                  }}
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || authCode.length !== 6}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#660033] hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#660033] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Verifying..." : "Verify Code"}
              </button>
            </form>
          </>
        )}

        {step === "2fa" && (
          <form className="mt-8 space-y-6" onSubmit={handle2FA}>
            <div>
              <label
                htmlFor="authCode"
                className="block text-sm font-medium text-gray-700"
              >
                Enter 2FA Code
              </label>
              <input
                id="authCode"
                name="authCode"
                type="text"
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#660033] focus:border-[#660033]"
                placeholder="Enter 6-digit code"
                value={authCode}
                onChange={(e) => {
                  setAuthCode(e.target.value);
                  if (error) setError("");
                }}
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || authCode.length !== 6}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#660033] hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#660033] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Verify Code"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
