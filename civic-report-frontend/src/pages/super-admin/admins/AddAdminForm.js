import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/AuroraOptionTheme.css";


export default function AddMiddleAdminForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= VALIDATIONS ================= */

  // ✅ Gmail only validation
  const isValidGmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  // ✅ Strong password validation
  const isStrongPassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  // ✅ Mobile validation: 10 digits and starts with 6/7/8/9
  const isValidMobile = (value) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(value);
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const normalizedMobile = mobile.replace(/\D/g, "").slice(0, 10);

    if (!trimmedUsername || !trimmedEmail || !normalizedMobile || !trimmedPassword) {
      setError("Username, Email, Mobile and Password are required.");
      return;
    }

    if (!isValidGmail(trimmedEmail)) {
      setError("Please enter a valid Gmail address (example@gmail.com).");
      return;
    }

    if (!isValidMobile(normalizedMobile)) {
      setError("Mobile number must be exactly 10 digits and start with 6, 7, 8, or 9.");
      return;
    }

    if (!isStrongPassword(trimmedPassword)) {
      setError(
        "Password must be at least 6 characters and include 1 uppercase letter, 1 number, and 1 special character."
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/admin/middle-admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: trimmedUsername,
          email: trimmedEmail,
          mobile: normalizedMobile,
          password: trimmedPassword,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Failed to create admin");
      } else {
        setSuccess("✅ Admin created successfully!");

        setUsername("");
        setEmail("");
        setMobile("");
        setPassword("");

        setTimeout(() => {
          navigate("/super-admin/welcome/admins");
        }, 1000);
      }
    } catch (err) {
      setError("❌ Network error. Please try again.");
    }

    setLoading(false);
  };

  /* ================= UI ================= */

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "var(--dashboard-page-bg)", padding: "20px" }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded-4 shadow bg-white"
        style={{ width: "100%", maxWidth: "480px" }}
        autoComplete="off"
        noValidate
      >
        {/* 🔒 Hidden fields to block Chrome autofill */}
        <input type="text" name="fakeuser" style={{ display: "none" }} />
        <input type="password" name="fakepass" style={{ display: "none" }} />

        <h3 className="fw-bold text-center mb-2">Add Admin</h3>
        <p className="text-muted text-center mb-4" style={{ fontSize: "14px" }}>
          Create a new admin account
        </p>

        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success py-2" role="alert">
            {success}
          </div>
        )}

        {/* Username */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Username *</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            placeholder="Enter username"
            required
            autoComplete="off"
            name="middle_admin_username"
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Gmail *</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            placeholder="example@gmail.com"
            required
            autoComplete="off"
            name="middle_admin_email"
          />
        </div>

        {/* Mobile */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Mobile *</label>
          <input
            type="tel"
            className="form-control"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
            disabled={loading}
            placeholder="Enter mobile number"
            required
            autoComplete="off"
            name="middle_admin_mobile"
            inputMode="numeric"
            maxLength={10}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Password *</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            placeholder="Enter strong password"
            required
            autoComplete="new-password"
            name="middle_admin_new_password"
          />
        </div>

        {/* Buttons */}
        <div className="mt-4 d-flex gap-2">
          <button
            type="submit"
            className="btn btn-success w-50"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary w-50"
            disabled={loading}
            onClick={() => navigate("/super-admin/welcome/admins")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
