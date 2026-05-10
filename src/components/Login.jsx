import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../cssPages/Login.css";

// ── Shared Sub-Components ──────────────────────────────────────────

const GrainOverlay = () => <div className="grain-overlay" />;

const InputField = ({ label, type = "text", value, onChange, placeholder, error }) => (
  <div className="input-group">
    <label className="input-label">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`input-field ${error ? "input-error" : ""}`}
    />
    {error && <p className="error-text">{error}</p>}
  </div>
);

// ── Login Form Component ───────────────────────────────────────────

function LoginForm({ onSwitch }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setServerError("");
    try {
      await login({ email: form.email, password: form.password });
      navigate("/");
    } catch (err) {
      setServerError(err?.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <InputField label="Email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" error={errors.email} />
      <InputField label="Password" type="password" value={form.password} onChange={set("password")} placeholder="••••••••" error={errors.password} />
      {serverError && <div className="server-error-box">{serverError}</div>}
      <button type="submit" disabled={loading} className="auth-submit-btn">
        {loading ? "Signing in..." : "Sign In"}
      </button>
      <p className="switch-text">
        Don't have an account? <button type="button" onClick={onSwitch} className="switch-link">Create one</button>
      </p>
    </form>
  );
}

// ── Register Form Component ────────────────────────────────────────

function RegisterForm({ onSwitch }) {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
        setErrors({ confirm: "Passwords do not match" });
        return;
    }
    setLoading(true);
    setServerError("");
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      navigate("/");
    } catch (err) {
      setServerError(err?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <InputField label="Full Name" value={form.name} onChange={set("name")} placeholder="Ravi Kumar" error={errors.name} />
      <InputField label="Email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" error={errors.email} />
      <InputField label="Password" type="password" value={form.password} onChange={set("password")} placeholder="Min. 6 characters" error={errors.password} />
      <InputField label="Confirm Password" type="password" value={form.confirm} onChange={set("confirm")} placeholder="••••••••" error={errors.confirm} />
      {serverError && <div className="server-error-box">{serverError}</div>}
      <button type="submit" disabled={loading} className="auth-submit-btn">
        {loading ? "Creating account..." : "Create Account"}
      </button>
      <p className="switch-text">
        Already have an account? <button type="button" onClick={onSwitch} className="switch-link">Sign in</button>
      </p>
    </form>
  );
}

// ── Main Exported Component ────────────────────────────────────────

export default function Login() {
  const [tab, setTab] = useState("login");

  return (
    <div className="login-page-wrapper">
      <GrainOverlay />
      <div className="bg-glow-spot" />

      <div className="login-content-container">
        <Link to="/" className="back-link">← Back to Cropyaan</Link>

        <div className="auth-card">
          <div className="auth-header">
            <p className="brand-badge">🌾 Cropyaan</p>
            <h1 className="auth-title">{tab === "login" ? "Welcome Back" : "Join Cropyaan"}</h1>
            <p className="auth-subtitle">
              {tab === "login" ? "Sign in to access your dashboard" : "Create a free account to get started"}
            </p>
          </div>

          <div className="tab-switcher">
            {["login", "register"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`tab-btn ${tab === t ? "active" : ""}`}
              >
                {t === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          {tab === "login" 
            ? <LoginForm onSwitch={() => setTab("register")} /> 
            : <RegisterForm onSwitch={() => setTab("login")} />
          }
        </div>

        <p className="footer-note">Free for all farmers · No hidden charges</p>
      </div>
    </div>
  );
}