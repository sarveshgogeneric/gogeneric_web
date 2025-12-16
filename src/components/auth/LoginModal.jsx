import { useState } from "react";
import "./LoginModal.css";
import api from "../../api/axiosInstance";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export default function LoginModal({ onClose }) {
  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [identifier, setIdentifier] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 👁️ Password visibility states
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { login } = useAuth();

  /* ================= SIGNUP ================= */
  const handleSignup = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone must be 10 digits");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if (!passwordRegex.test(password)) {
  toast.error(
    "Password must be at least 8 characters and include uppercase, lowercase, number & special character"
  );
  return;
}


    try {
      const res = await api.post("/api/v1/auth/sign-up", {
        name,
        email,
        phone,
        password,
      });

      const apiUser = res.data?.data;

      const normalizedUser = {
        id: apiUser?.id,
        name: apiUser?.name || email.split("@")[0],
        email: apiUser?.email || email,
        phone: apiUser?.phone || phone,
      };

      login(normalizedUser, null);
      toast.success("Signup successful!");
      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.message ||
          "Signup failed"
      );
    }
  };

  /* ================= LOGIN ================= */
  const handleLogin = async () => {
    if (!identifier || !password) {
      toast.error("Email/Phone & Password required");
      return;
    }

    try {
      const res = await api.post("/api/v1/auth/login", {
        login_type: "manual",
        email_or_phone: identifier,
        password,
        field_type: identifier.includes("@") ? "email" : "phone",
      });

      const apiUser = res.data.user || res.data;

      const normalizedUser = {
        id: apiUser?.id,
        name:
          apiUser?.name ||
          apiUser?.f_name ||
          apiUser?.full_name ||
          apiUser?.email?.split("@")[0],
        email: apiUser?.email,
        phone: apiUser?.phone,
      };

      login(normalizedUser, res.data.token);
      toast.success(`Welcome ${normalizedUser.name}`);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-box">
        <span className="close-icon" onClick={onClose}>
          ×
        </span>

        <h2 className="title">
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h2>

        {isSignup ? (
          <>
            <input
              className="input"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="input"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {/* Signup Password */}
            <div className="password-wrapper">
              <input
                className="input"
                type={showSignupPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="eye-icon"
                onClick={() =>
                  setShowSignupPassword(!showSignupPassword)
                }
              >
                {showSignupPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="password-wrapper">
              <input
                className="input"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />
              <span
                className="eye-icon"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </span>
            </div>

            <button className="submit-btn" onClick={handleSignup}>
              Signup
            </button>

            <p className="switch-text">
              Already have an account?
              <span onClick={() => setIsSignup(false)}> Login</span>
            </p>
          </>
        ) : (
          <>
            <input
              className="input"
              placeholder="Email or Phone"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />

            {/* Login Password */}
            <div className="password-wrapper">
              <input
                className="input"
                type={showLoginPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="eye-icon"
                onClick={() =>
                  setShowLoginPassword(!showLoginPassword)
                }
              >
                {showLoginPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </span>
            </div>

            <button className="submit-btn" onClick={handleLogin}>
              Login
            </button>

            <p className="switch-text">
              Don’t have an account?
              <span onClick={() => setIsSignup(true)}> Signup</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
