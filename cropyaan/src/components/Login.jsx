import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ── Helpers ──────────────────────────────────────────────────────────────────

const GrainOverlay = () => (
  <div
    style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, opacity: 0.032,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundSize: "128px 128px",
    }}
  />
);

const InputField = ({ label, type = "text", value, onChange, placeholder, error }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <label style={{ color: "var(--color-text-muted)", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: error ? "1px solid rgba(239,68,68,0.5)" : "1px solid var(--overlay-10)",
        borderRadius: 10,
        padding: "13px 16px",
        color: "var(--color-text)",
        fontSize: "0.9rem",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 300,
        outline: "none",
        transition: "border-color 0.3s, box-shadow 0.3s",
        width: "100%",
        boxSizing: "border-box",
      }}
      onFocus={e => {
        e.target.style.borderColor = "rgba(34,197,94,0.5)";
        e.target.style.boxShadow = "0 0 0 3px rgba(34,197,94,0.08)";
      }}
      onBlur={e => {
        e.target.style.borderColor = error ? "rgba(239,68,68,0.5)" : "var(--overlay-10)";
        e.target.style.boxShadow = "none";
      }}
    />
    {error && (
      <p style={{ color: "#fca5a5", fontSize: "0.78rem", fontWeight: 300, marginTop: 2 }}>
        {error}
      </p>
    )}
  </div>
);

// ── Login Form ────────────────────────────────────────────────────────────────

function LoginForm({ onSwitch }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email address";
    if (!form.password) errs.password = "Password is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setServerError("");
    setLoading(true);
    try {
      await login({ email: form.email, password: form.password });
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.message;
      setServerError(msg || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      <InputField
        label="Email"
        type="email"
        value={form.email}
        onChange={set("email")}
        placeholder="you@example.com"
        error={errors.email}
      />
      <InputField
        label="Password"
        type="password"
        value={form.password}
        onChange={set("password")}
        placeholder="••••••••"
        error={errors.password}
      />

      {serverError && (
        <div style={{
          padding: "12px 16px", borderRadius: 10,
          background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)",
          color: "#fca5a5", fontSize: "0.875rem", fontWeight: 300,
        }}>
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: 4,
          padding: "14px",
          borderRadius: 10,
          background: loading ? "rgba(34,197,94,0.5)" : "#22c55e",
          border: "none",
          color: "#000",
          fontWeight: 600,
          fontSize: "0.9rem",
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.04em",
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: loading ? "none" : "0 0 28px rgba(34,197,94,0.35)",
          transition: "all 0.3s",
        }}
        onMouseEnter={e => { if (!loading) e.target.style.background = "#16a34a"; }}
        onMouseLeave={e => { if (!loading) e.target.style.background = "#22c55e"; }}
      >
        {loading ? "Signing in…" : "Sign In"}
      </button>

      <p style={{ textAlign: "center", color: "rgba(113,113,122,0.7)", fontSize: "0.85rem", fontWeight: 300 }}>
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          style={{ color: "#22c55e", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 500 }}
        >
          Create one
        </button>
      </p>
    </form>
  );
}

// ── Register Form ─────────────────────────────────────────────────────────────

function RegisterForm({ onSwitch }) {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    else if (form.name.trim().length < 2) errs.name = "Name must be at least 2 characters";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email address";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "Password must be at least 6 characters";
    if (!form.confirm) errs.confirm = "Please confirm your password";
    else if (form.password !== form.confirm) errs.confirm = "Passwords do not match";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setServerError("");
    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.message;
      setServerError(msg || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

      <InputField
        label="Full Name"
        value={form.name}
        onChange={set("name")}
        placeholder="Ravi Kumar"
        error={errors.name}
      />
      <InputField
        label="Email"
        type="email"
        value={form.email}
        onChange={set("email")}
        placeholder="you@example.com"
        error={errors.email}
      />
      <InputField
        label="Password"
        type="password"
        value={form.password}
        onChange={set("password")}
        placeholder="Min. 6 characters"
        error={errors.password}
      />
      <InputField
        label="Confirm Password"
        type="password"
        value={form.confirm}
        onChange={set("confirm")}
        placeholder="••••••••"
        error={errors.confirm}
      />

      {serverError && (
        <div style={{
          padding: "12px 16px", borderRadius: 10,
          background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)",
          color: "#fca5a5", fontSize: "0.875rem", fontWeight: 300,
        }}>
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: 4,
          padding: "14px",
          borderRadius: 10,
          background: loading ? "rgba(34,197,94,0.5)" : "#22c55e",
          border: "none",
          color: "#000",
          fontWeight: 600,
          fontSize: "0.9rem",
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.04em",
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: loading ? "none" : "0 0 28px rgba(34,197,94,0.35)",
          transition: "all 0.3s",
        }}
        onMouseEnter={e => { if (!loading) e.target.style.background = "#16a34a"; }}
        onMouseLeave={e => { if (!loading) e.target.style.background = "#22c55e"; }}
      >
        {loading ? "Creating account…" : "Create Account"}
      </button>

      <p style={{ textAlign: "center", color: "rgba(113,113,122,0.7)", fontSize: "0.85rem", fontWeight: 300 }}>
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          style={{ color: "#22c55e", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 500 }}
        >
          Sign in
        </button>
      </p>
    </form>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function Login() {
  const [tab, setTab] = useState("login"); // "login" | "register"

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #1a1a1a inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      `}</style>

      <GrainOverlay />

      <div style={{
        minHeight: "100vh",
        background: "var(--bg-main)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Background glow */}
        <div style={{
          position: "fixed", pointerEvents: "none",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)",
          top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          filter: "blur(40px)",
        }} />

        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 460 }}>

          {/* Back to home */}
          <Link
            to="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              color: "rgba(113,113,122,0.7)", fontSize: "0.82rem",
              textDecoration: "none", marginBottom: 32,
              transition: "color 0.3s", fontWeight: 400,
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#22c55e"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(113,113,122,0.7)"}
          >
            ← Back to Cropyaan
          </Link>

          {/* Card */}
          <div style={{
            background: "var(--overlay-25)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            padding: "40px 36px",
            backdropFilter: "blur(12px)",
          }}>

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <p style={{ color: "#22c55e", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500, marginBottom: 10 }}>
                🌾 Cropyaan
              </p>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.9rem", fontWeight: 700, color: "var(--color-text)", marginBottom: 6, lineHeight: 1.2 }}>
                {tab === "login" ? "Welcome Back" : "Join Cropyaan"}
              </h1>
              <p style={{ color: "rgba(113,113,122,0.8)", fontSize: "0.875rem", fontWeight: 300 }}>
                {tab === "login"
                  ? "Sign in to access your farming dashboard"
                  : "Create a free account to get started"}
              </p>
            </div>

            {/* Tab switcher */}
            <div style={{
              display: "flex",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--overlay-10)",
              borderRadius: 10,
              padding: 4,
              marginBottom: 28,
            }}>
              {["login", "register"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    flex: 1,
                    padding: "9px",
                    borderRadius: 7,
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontWeight: tab === t ? 600 : 400,
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.03em",
                    transition: "all 0.25s",
                    background: tab === t ? "#22c55e" : "transparent",
                    color: tab === t ? "#000" : "var(--color-text-muted)",
                    boxShadow: tab === t ? "0 0 20px rgba(34,197,94,0.3)" : "none",
                  }}
                >
                  {t === "login" ? "Sign In" : "Register"}
                </button>
              ))}
            </div>

            {/* Forms */}
            {tab === "login"
              ? <LoginForm onSwitch={() => setTab("register")} />
              : <RegisterForm onSwitch={() => setTab("login")} />
            }
          </div>

          {/* Footer note */}
          <p style={{ textAlign: "center", marginTop: 24, color: "rgba(113,113,122,0.45)", fontSize: "0.75rem", fontWeight: 300 }}>
            Free for all farmers · No hidden charges
          </p>
        </div>
      </div>
    </>
  );
}